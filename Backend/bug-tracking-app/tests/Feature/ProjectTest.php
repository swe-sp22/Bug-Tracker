<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\User;

class ProjectTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function get_all_projects(){
        $project = factory('App\Project')->create();
        $response = $this->get('api/projects');
        $response->assertSee($project->title)
                ->assertSee($project->description);
    }

    /** @test */
    public function show_single_project(){
        $project = factory('App\Project')->create();
        $response = $this->get('api/projects/'.$project->id);
        $response->assertSee($project->title)
                ->assertSee($project->description);
    }

    /** @test */
    public function admin_can_create_project(){
        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        $user = factory('App\User')->create();
        $token =  $user->createToken('authToken')->accessToken;
        $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
         ])->postJson('/api/projects', ['title'=>'test project', 'description'=>'proj desc'])
            ->assertStatus(201);
    }

    /** @test */
    public function admin_can_update_project(){
        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        $user = factory('App\User')->create();
        $token =  $user->createToken('authToken')->accessToken;
        $project = factory('App\Project')->create();
        $this->withHeaders([
                    'Authorization' => 'Bearer '. $token,
                 ])->putJson("api/projects/{$project->id}", ['title'=>'updated title', 'description'=>'uodated desc'])
            ->assertStatus(200)
            ->assertJsonFragment(['title'=>'updated title', 'description'=>'uodated desc']);
    }

    /** @test */
    public function admin_can_delete_project(){

        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        $user = factory('App\User')->create();
        $token =  $user->createToken('authToken')->accessToken;

        $project = factory('App\Project')->create();
        $this->withHeaders([
        'Authorization' => 'Bearer '. $token,])
            ->deleteJson('/api/projects/'.$project->id)
            ->assertStatus(202);

}
    
}