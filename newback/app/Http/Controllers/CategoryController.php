<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories= Category::all();

        // check if categories exist
        if($categories->isEmpty()) {
            return response()->json(['message'=> 'No categories found'], 404);
        }

        return response()->json
        ([
            'message' => 'Categories retrieved successfully',
            'categories' => $categories,
        ],200);
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
        // validate data
        $createDataCategory = $request->validated();

        // create category 
        $storeCategory = Category::create($createDataCategory);

        // response Api
        return response()->json
        ([
            'message' => 'Category created successfully',
            'category' => $storeCategory,
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
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
    public function update(CategoryRequest $request , $id)
    {
        // find category by id
        $category = Category::find($id);

        // check if category exists
        if(!$category) {
            return response()->json(['message'=> 'Category not found'], 404);
        }

        // validate data
        $updateDataCategory = $request->validated();

        // update category 
        $category->update($updateDataCategory);

        // response Api
        return response()->json
        ([
            'message' => 'Category updated successfully',
            'category' => $category,
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // find by id
        $category = Category::find($id);

        // check if category exists
        if(!$category) {
            return response()->json(['message'=> 'Category not found'], 404);
        }

        // delete category
        $category->delete();

        // response Api
        return response()->json
        ([
            'message' => 'Category deleted successfully',
        ],200);
    }
}
