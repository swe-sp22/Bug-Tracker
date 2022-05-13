<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $all_projects = Project::paginate(15);
        return response()->json($all_projects, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $curr_user = Auth::user();
        if ($curr_user->role_id != 1) {
            return response(["message" => "Unauthorized, You must be an admin"]);
        }

        // Validation
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'max:255', 'unique:projects'],
            'description' => ['required','max:255']
        ]);

        if ($validator->fails()) {
            return response(
                [
                    'message' => $validator->errors()
                ],
                400
            );
        }

        $project = Project::create([
            "title" => $request->title,
            "description" => $request->description
        ]);
        
        return response()->json($project, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $project = Project::find($id);
        if (! $project) {
            return response()->json("Project not found", 404);
        }
        return response()->json($project, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $curr_user = Auth::user();
        if ($curr_user->role_id != 1) {
            return response(["message" => "Unauthorized, You must be an admin"]);
        }

        // Validation
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'max:255', 'unique:projects'],
            'description' => ['required','max:255']
        ]);

        if ($validator->fails()) {
            return response(
                [
                    'message' => $validator->errors()
                ],
                400
            );
        }

        $project = Project::find($id);
        $project->title = $request->title;
        $project->description = $request->description;
        $project->save();

        return response()->json($project, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $curr_user = Auth::user();
        if ($curr_user->role_id != 1) {
            return response(["message" => "Unauthorized, You must be an admin"]);
        }

        $project = Project::find($id);
        if (! $project) {
            return response()->json("Project not found", 204);
        }
        $project->delete();
        return response()->json("Project deleted", 202);
    }
}
