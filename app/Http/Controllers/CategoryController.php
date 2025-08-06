<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    /**
     * Test method to debug issues
     */
    public function test()
    {
        try {
            Log::info('Test method called');

            // Check S3 configuration
            $s3Config = [
                'key' => env('AWS_ACCESS_KEY_ID'),
                'secret' => env('AWS_SECRET_ACCESS_KEY') ? 'SET' : 'NOT_SET',
                'region' => env('AWS_DEFAULT_REGION'),
                'bucket' => env('AWS_BUCKET'),
                'url' => env('AWS_URL'),
                'endpoint' => env('AWS_ENDPOINT'),
            ];

            return response()->json([
                'message' => 'Test endpoint working',
                'timestamp' => now(),
                'user' => auth()->user(),
                's3_config' => $s3Config,
                'filesystem_default' => config('filesystems.default'),
                's3_disk_configured' => config('filesystems.disks.s3') ? true : false,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Test method failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Test failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();

        // check if categories exist
        if ($categories->isEmpty()) {
            return response()->json(['message' => 'No categories found'], 404);
        }

        return response()->json([
            'message' => 'Categories retrieved successfully',
            'categories' => $categories,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        try {
            Log::info('Category store method called', [
                'request_data' => $request->all(),
                'files' => $request->allFiles()
            ]);

            // validate data
            $createDataCategory = $request->validated();
            Log::info('Validation passed', ['validated_data' => $createDataCategory]);

            $created = [];

            // create category 
            foreach ($createDataCategory['name'] as $index => $name) {
                Log::info("Processing category {$index}", ['name' => $name]);

                $description = $createDataCategory['description'][$index] ?? null;

                $cover = null;
                if ($request->hasFile("cover.$index")) {
                    try {
                        $file = $request->file("cover.$index");
                        Log::info("Processing file for category {$index}", [
                            'original_name' => $file->getClientOriginalName(),
                            'size' => $file->getSize(),
                            'mime_type' => $file->getMimeType()
                        ]);

                        $filename = time() . '_' . $file->getClientOriginalName();
                        // Use S3 instead of local public disk
                        $filePath = $file->storeAs('category_covers', $filename, 's3');
                        $cover = $filePath;

                        Log::info("File stored successfully on S3", ['file_path' => $filePath]);
                    } catch (\Exception $fileException) {
                        Log::error("File upload failed for category {$index}", [
                            'error' => $fileException->getMessage(),
                            'trace' => $fileException->getTraceAsString()
                        ]);
                        // Continue without the file
                    }
                }

                try {
                    $category = Category::create([
                        'name' => $name,
                        'description' => $description,
                        'cover' => $cover,
                    ]);
                    $created[] = $category;
                    Log::info("Category created successfully", ['category_id' => $category->id]);
                } catch (\Exception $dbException) {
                    Log::error("Database error creating category {$index}", [
                        'error' => $dbException->getMessage(),
                        'trace' => $dbException->getTraceAsString()
                    ]);
                    throw $dbException;
                }
            }

            Log::info('All categories created successfully', ['count' => count($created)]);

            // response Api
            return response()->json([
                'message' => 'Category created successfully',
                'category' => $created,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Category store method failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'message' => 'Failed to create categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // find category by id
        $category = Category::find($id);

        // check if category exists
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        // response Api
        return response()->json([
            'message' => 'Category retrieved successfully',
            'category' => $category,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $updateDataCategory = $request->validated();

        if ($request->hasFile('cover')) {
            $file = $request->file('cover');
            $filename = time() . '_' . $file->getClientOriginalName();
            // Use S3 instead of local public disk
            $filePath = $file->storeAs('category_covers', $filename, 's3');
            $updateDataCategory['cover'] = $filePath;
        }

        $category->update($updateDataCategory);

        return response()->json([
            'message' => 'Category updated successfully',
            'category' => $category,
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // find by id
        $category = Category::find($id);

        // check if category exists
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        // delete category
        $category->delete();

        // response Api
        return response()->json([
            'message' => 'Category deleted successfully',
        ], 200);
    }

    /**
     * Get projects by category ID
     */
    public function getProjectsByCategory($id)
    {
        Log::info('getProjectsByCategory called with ID: ' . $id);

        // Optional: validate the category exists
        $category = Category::find($id);
        if (!$category) {
            Log::error('Category not found with ID: ' . $id);
            return response()->json(['message' => 'Category not found'], 404);
        }

        Log::info('Category found: ' . $category->name);

        // Fetch projects with their images
        $projects = Project::with('images')->where('category_id', $id)->get();

        Log::info('Projects found: ' . $projects->count());

        if ($projects->isEmpty()) {
            Log::warning('No projects found for category ID: ' . $id);
            return response()->json(['message' => 'No projects found for this category'], 404);
        }

        return response()->json([
            'message' => 'Projects retrieved successfully',
            'projects' => $projects
        ], 200);
    }
}
