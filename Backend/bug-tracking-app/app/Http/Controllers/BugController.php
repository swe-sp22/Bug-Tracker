<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Bug;
use App\Project;
use App\User;

class BugController extends Controller
{
    /**
     * Display a listing of the resource
     *
     * @return \Illuminate\Http\Response
     */
    public function index($project_id, $status = NULL)
    {
        // 10.1. Any user can view all bugs of any project
        if (! request()->filled('status')) {
            $all_bugs = Bug::where('project_id', $project_id)->paginate(15);
        } else {
            $all_bugs = Bug::where('project_id', $project_id)
                ->where('status', request()->status)
                ->paginate(15);
        }
        return response()->json($all_bugs, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // 3. A customer/staff member/administrator can open a bug to an existing project
        // Validation
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'max:255', 'unique:bugs'],
            'description' => ['max:255'],
            'project_id' => ['required']
        ]);

        if ($validator->fails()) {
            return response(
                [
                    'message' => $validator->errors()
                ],
                400
            );
        }

        $project = Project::findOrFail($request->project_id);

        $bug = new Bug();
        $bug->title = $request->title;
        $bug->description = $request->description;
        $bug->photo = $request->photo;
        $bug->type = $request->type;
        $bug->status = 'NEW';
        $bug->project_id = $project->id;
        $bug->comment = $request->comment;
        $bug->save();
        
        return response()->json($bug, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bug = Bug::find($id);
        if (! $bug) {
            return response()->json("Bug not found", 404);
        }
        $assignee = User::find($bug->assignee_id);
        $bug['assigned_staff_member'] = $assignee;
        return response()->json($bug, 200);
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
        $validator = Validator::make($request->all(), [
            'title' => ['max:255'],
            'description' => ['max:255'],
            'status' => ['in:OPEN,NEW,ASSIGNED,FIXED,DUPLICATE,REJECTED,PENDING,RETEST,VERIFIED,CLOSED']
        ]);

        if ($validator->fails()) {
            return response(
                [
                    'message' => $validator->errors()
                ],
                400
            );
        }

        $bug = Bug::findOrFail($id);
        if ($request->title) {
            $bug->title = $request->title;
        }

        if ($request->description) {
            $bug->description = $request->description;
        }

        if ($request->status) {
            $bug->status = $request->status;
        }

        $bug->type = $request->type;
        $bug->photo = $request->photo;
        $bug->save();

        return response()->json($bug, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $bug = Bug::find($id);
        if (! $bug) {
            return response()->json('Bug not found', 404);
        }

        $curr_user = Auth::user();
        if ($curr_user->role_id != 1) {
            return response()->json(["message" => "You can not delete a bug, but you can close it"], 401);
        }

        $bug->delete();
        return response()->json('Bug successfully deleted', 202);   
    }

    public function changeStatus(Request $request, $id)
    {
        // Authorization
        $curr_user = Auth::user();
        if ($curr_user->role_id ==3) {
            return response(["message" => "Unauthorized, You must be an admin or staff member", 401]);
        }
       
        // Validation
        $validator = Validator::make($request->all(), [
            'status' => ['in:OPEN,NEW,ASSIGNED,FIXED,DUPLICATE,REJECTED,PENDING,RETEST,VERIFIED,CLOSED']
        ]);
        if ($validator->fails()) {
            return response(
                [
                    'message' => $validator->errors()
                ],
                400
            );
        }

        $bug = Bug::findOrFail($id);
        // Comment is mandatory while rejection
        if ($request->status == 'REJECTED' && ! $request->comment) {
            return response()->json("Comment must be added while rejection", 403); 
        }
        //Else: comment may be null
        $bug->status = $request->status;
        $bug->comment = $request->comment;
        $bug->save();

        return response()->json($bug, 200);
    }

    public function assignMemberToBug(Request $request, $bug_id, $assignee_id)
    {
        $curr_user = Auth::user();
        if ($curr_user->role_id != 1) {
            return response()->json("Only admins can assign staff members to bugs", 403);
        }
        $bug = Bug::findOrFail($bug_id);
        $assignee = User::findOrFail($assignee_id);

        if ($assignee->role_id == 2) {
            $bug->assignee_id = $assignee->id;
            $bug->status = 'ASSIGNED';
            $bug->save();
            return response()->json([
                "msg"=>"Staff member has been successfully assigned to the bug",
                "bug" => $bug
            ], 200);
        } else {
            return response()->json("Assignee must be a staff member!", 403);
        }
    }


    public function viewMemberBugs($staff_member_id)
    {
        // An administrator can view bugs assigned to a specific staff member
        $curr_user = Auth::user();
        if ($curr_user->role_id != 1) {
            return response()->json("Only admins can view staff members bugs", 403);
        }
        $staff_member = User::findOrFail($staff_member_id);
        if ($staff_member->role_id !=2) {
            return response()->json("You must provide a staff member id!", 403);
        }

        $bugs = Bug::where('assignee_id', $staff_member->id)->get();
        return response()->json($bugs, 200);
    }

    public function memberViewhisBugs()
    {
        $curr_user = Auth::user();
        if ($curr_user->role_id == 2) {
            $bugs = Bug::where('assignee_id', $curr_user->id)->get();
            return response()->json($bugs, 200);
        }
        return response()->json('Unauthorized, you must be a staff member', 403);
    }

    public function bugCount()
    {
        return response([Bug::all()->count()]);
    }
}
