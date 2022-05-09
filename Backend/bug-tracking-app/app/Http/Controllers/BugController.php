<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Bug;

class BugController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $all_bugs = Bug::paginate(15);
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
        // Validation
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'max:255', 'unique:bugs'],
            'description' => ['max:255'],
        ]);

        if ($validator->fails()) {
            return response(
                [
                    'message' => $validator->errors()
                ],
                400
            );
        }

        $bug = new Bug();
        $bug->title = $request->title;
        $bug->description = $request->description;
        $bug->photo = $request->photo;
        $bug->type = $request->type;
        $bug->status = 'NEW';
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
        if(!$bug)   return response()->json("Bug not found",404);
        return response()->json($bug,200);
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

        $bug = Bug::find($id);
        if($request->title) $bug->title = $request->title;
        if($request->description)   $bug->description = $request->description;
        if($request->status)    $bug->status = $request->status;
        $bug->type = $request->type;
        $bug->photo = $request->photo;
        $bug->save();

        return response()->json($bug,200);


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
        if(!$bug)   return response()->json('You can not delete a bug, but you can close it!', 403);
        $bug->delete();
        return response()->json('Bug successfully deleted', 202);   
    }
}
