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
    public function user_get_all_bugs_of_project()
    {
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
    public function user_get_single_bug()
    {
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
    public function user_can_create_bug()
    {
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
            'description'=>'bug desc','project_id'=>$project->id
        ])
            ->assertStatus(201)
            ->assertJsonFragment([
                "title"=> "test bug create",
                "description"=> "bug desc",
                "photo"=> NULL,
                "type"=> NULL,
                "status"=> "NEW",
                "project_id"=> $project->id,
                "id"=> 1
            ]);
    }

    /** @test */
    public function new_bug_should_not_have_comment()
    {
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
            'description'=>'bug desc',
            'project_id'=>$project->id,
            'comment' => 'IGNORE THIS.'
        ])
            ->assertStatus(201)
            ->assertJsonFragment([
                "title"=> "test bug create",
                "description"=> "bug desc",
                "photo"=> NULL,
                "type"=> NULL,
                "status"=> "NEW",
                "project_id"=> $project->id,
                "id"=> 1
            ])
            ->assertJsonMissing([
                "comment" => "IGNORE THIS."
            ]);
    }

    /** @test */
    public function admin_can_update_bug()
    {
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
    public function user_cant_update_bug()
    {
        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        factory('App\Role')->create();
        factory('App\Role')->create();

        $user = factory('App\User')->create();
        $user->role_id = 3;
        $user->save();

        $token =  $user->createToken('authToken')->accessToken;
        $bug = factory('App\Bug')->create();
        $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
        ])->putJson("api/bugs/{$bug->id}", ['title'=>'updated title', 'description'=>'uodated desc', 'status'=>'OPEN'])
            ->assertStatus(403);
    }

    /** @test */
    public function user_can_delete_bug()
    {

        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        $user = factory('App\User')->create();
        $token =  $user->createToken('authToken')->accessToken;

        $bug = factory('App\Bug')->create();
        $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
        ])
            ->delete('/api/bugs/'.$bug->id)
            ->assertStatus(202);
    }

    /** @test */
    public function change_bug_status()
    {
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
    
    /** @test */
    public function assign_member_to_Bug()
    {
        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        $staff_role = factory('App\Role')->create();

        $user = factory('App\User')->create();
        $token =  $user->createToken('authToken')->accessToken;

        $staff_member = factory('App\User')->create();
        $staff_member->role_id = $staff_role->id;
        $staff_member->save();
        $bug = factory('App\Bug')->create();

        $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
        ])->postJson("api/bugs/{$bug->id}/assign/{$staff_member->id}")
            ->assertStatus(200);
    }
    
    /** @test */
    public function admin_view_member_bugs()
    {
          parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        factory('App\Role')->create();

        $user = factory('App\User')->create();
        $token =  $user->createToken('authToken')->accessToken;

        $staff_member = factory('App\User')->create();
        $staff_member->role_id = 2;
        $staff_member->save();

        $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
        ])->getJson("api/member/{$staff_member->id}/bugs")
            ->assertStatus(200);
    }

    /** @test */
    public function staff_member_view_his_bugs()
    {
        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        factory('App\Role')->create();

        $staff_member = factory('App\User')->create();
        $staff_member->role_id = 2;
        $staff_member->save();
        $token =  $staff_member->createToken('authToken')->accessToken;


        $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
        ])->getJson("api/member/bugs")
            ->assertStatus(200);
    }
}
