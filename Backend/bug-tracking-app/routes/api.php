<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->group(function () {
    Route::post('register', 'UserAuthController@register');
    Route::get('logout', 'UserAuthController@logout');
    Route::get('users/{id}', 'UserAuthController@getUser');
    Route::get('staff', 'UserAuthController@getStaffMembers');
    
    Route::get('project/count', 'ProjectController@projectCount');
    Route::resource('projects', 'ProjectController');
    Route::resource('bugs', 'BugController')->except(['index','changeStatus']);
    Route::get('bugs/project/{project_id}/{status?}', 'BugController@index');
    Route::put('bugs/status/{id}', 'BugController@changeStatus');
    Route::post('bugs/{bug_id}/assign/{assignee_id}', 'BugController@assignMemberToBug');
    Route::get('member/{member_id}/bugs', 'BugController@viewMemberBugs');
    Route::get('member/bugs', 'BugController@memberViewhisBugs');
    Route::get('bug/count', 'BugController@bugCount');

});

Route::post('login', 'UserAuthController@login');
