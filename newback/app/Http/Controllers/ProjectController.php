<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Requests\ProjectRequest;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //display all projects
        $projectsAll = Project::get();
        // check if projects exist
        if ($projectsAll->isEmpty()) {
            return response()->json(['message' => 'No projects found'], 404);
        }
        // response Api
        return response()->json([
            'message' => 'Projects retrieved successfully',
            'projects' => $projectsAll,
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
    public function store(ProjectRequest $request)
    {
        // validate data
        $validatedProjectData = $request->validated();

        // check if project already exists
        $esistingProjects= Project::where('name' , $validatedProjectData['name'])
            ->where('description', $validatedProjectData['description'])
            ->where('category_id', $validatedProjectData['category_id'])
            ->first();
        if ($esistingProjects) {
            return response()->json([
                'message' => 'Project already exists',
                'project' => $esistingProjects,
            ], 409); // Conflict status code
        }
        
        // create new project
        $project = Project::create($validatedProjectData);

        // handle file upload if image_url is provided
        if($request->hasFile('image_url'))
        {
            foreach($request->file('image_url') as $image)
            {
                //save image file to storage 
                $path  = $image->store('projects', 'public');

                // save image path in project_images table
                $project->images()->create([
                    'image_url' => $path,
                ]);

            }
        }

        // response Api
        return response()->json([
            'message' => 'Project created successfully',
            'project' => $project,
        ], 201); // Created status code



    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, $id)
    {
        //find by id
        $project = Project::find($id);

        //check if exists
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        //validate data
        $validatedProjectData = $request->validated();

        // upload new images if provided and delete old images
        if ($request->hasFile('image_url')) {
            // delete old images
            foreach ($project->images as $image) {
                if (Storage::disk('public')->exists($image->image_url)) {
                    Storage::disk('public')->delete($image->image_url);
                }
                $image->delete();
            }

            // save new images
            foreach ($request->file('image_url') as $image) {
                $path = $image->store('projects', 'public');
                $project->images()->create(['image_url' => $path]);
            }
        }

        // update project
        $project->update($validatedProjectData);

        // response Api
        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project,
        ], 200); // OK status code
        
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $project = Project::find($id);

    if (!$project) {
        return response()->json(['message' => 'Project not found'], 404);
    }

    // Delete images from storage
    foreach ($project->images as $image) {
        if (Storage::disk('public')->exists($image->image_url)) {
            Storage::disk('public')->delete($image->image_url);
        }
        $image->delete(); // delete from DB
    }

    // Delete project
    $project->delete();

    return response()->json(['message' => 'Project and its images deleted successfully'], 200);
}

}
