<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // display all experiences
        $experience= Experience::all();

        // check if experiences exist
        if($experience->isEmpty()) {
            return response()->json(['message' => 'No experiences found'], 404);
        }

        //response Api
        return response()->json([
            'message' => 'Experiences retrieved successfully',
            'experiences' => $experience,
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
    public function store(ExperienceRequest $request)
    {
        //validate data
        $experienceData = $request->validated();

        // check if experience already exists
        $existingExperience = Experience::where('poste' , $experienceData['poste'])
            ->where('place', $experienceData['place'])
            ->where('city', $experienceData['city'])
            ->where('year_start', $experienceData['year_start'])
            ->first();
        if ($existingExperience) {
            return response()->json([
                'message' => 'Experience already exists',
                'experience' => $existingExperience,
            ], 409); // Conflict status code
        }

        // create new experience
        $experience = Experience::create($experienceData);
        // response Api
        return response()->json([
            'message' => 'Experience created successfully',
            'experience' => $experience,
        ], 201); // Created status code
    }

    /**
     * Display the specified resource.
     */
    public function show(Experience $experience)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Experience $experience)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ExperienceRequest $request, $id)
    {
        //find by id
        $experience= Experience::find($id);
        //check if exists
        if(!$experience)
        {
            return response()->json(['message' => 'Experience not found'], 404);
        }
        //validate data
        $experienceValidated = $request->validated();

        //update experience
        $experience->update($experienceValidated);

        // response Api
        return response()->json([
            'message' => 'Experience updated successfully',
            'experience' => $experience,
        ], 200); // OK status code
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
         //find by id
        $experience= Experience::find($id);
        //check if exists
        if(!$experience)
        {
            return response()->json(['message' => 'Experience not found'], 404);
        }

        //delete experience
        $experience->delete();
        
        // response Api
        return response()->json([
            'message' => 'Experience deleted successfully',
        ], 200); // OK status code
    }
}
