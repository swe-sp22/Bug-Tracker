<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\User;

class BugTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function user_get_all_bugs_of_project(){
        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        $user = factory('App\User')->create();
        $token =  $user->createToken('authToken')->accessToken;

        
        $project = factory('App\Project')->create();
        $bug = factory('App\Bug')->create();
        $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
         ])->getJson("/api/bugs/project/{$project->id}?=NEW")
         ->assertStatus(200)
         ->assertJsonCount(12);
       
    }

    /** @test */
    public function user_get_single_bug(){
        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        $user = factory('App\User')->create();
        $token =  $user->createToken('authToken')->accessToken;

        $bug = factory('App\Bug')->create();
        
        $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
         ])->getJson("api/bugs/{$bug->id}")->assertStatus(200);
    }

    /** @test */
    public function user_can_create_bug(){
        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        $user = factory('App\User')->create();
        $token =  $user->createToken('authToken')->accessToken;

        $project = factory('App\Project')->create();

        $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
         ])->postJson('/api/bugs', [
            'title'=>'test bug create', 
            'description'=>'bug desc','project_id'=>$project->id])
            ->assertStatus(201)
            ->assertJsonFragment([
            "title"=> "test bug create",
            "description"=> "bug desc",
            "photo"=> null,
            "type"=> null,
            "status"=> "NEW",
            "project_id"=> $project->id,
            "id"=> 1]);
    }

    /** @test */
    public function user_can_update_bug(){
        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        $user = factory('App\User')->create();
        $token =  $user->createToken('authToken')->accessToken;
        $bug = factory('App\Bug')->create();
        $this->withHeaders([
                    'Authorization' => 'Bearer '. $token,
                 ])->putJson("api/bugs/{$bug->id}", ['title'=>'updated title', 'description'=>'uodated desc', 'status'=>'OPEN'])
            ->assertStatus(200)
            ->assertJsonFragment(['title'=>'updated title', 'description'=>'uodated desc', 'status'=>'OPEN']);
    }

    /** @test */
    public function user_can_delete_bug(){

        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        $user = factory('App\User')->create();
        $token =  $user->createToken('authToken')->accessToken;

        $bug = factory('App\Bug')->create();
        $this->withHeaders([
        'Authorization' => 'Bearer '. $token,])
            ->delete('/api/bugs/'.$bug->id)
            ->assertStatus(202);

}

/** @test */
public function change_bug_status(){
    parent::setUp();
    \Artisan::call('passport:install');
    
    factory('App\Role')->create();
    $user = factory('App\User')->create();
    $token =  $user->createToken('authToken')->accessToken;

    $bug = factory('App\Bug')->create();

    $this->withHeaders([
                'Authorization' => 'Bearer '. $token,
                ])->putJson("api/bugs/status/{$bug->id}", ['status'=>'OPEN', 'comment'=>'opening a bug'])
        ->assertStatus(200)
        ->assertJsonFragment(['status'=>'OPEN', 'comment'=>'opening a bug']);
}
    
}