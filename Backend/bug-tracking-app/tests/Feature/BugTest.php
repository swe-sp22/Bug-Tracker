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
    public function get_all_bugs(){
        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        $user = factory('App\User')->create();
        $token =  $user->createToken('authToken')->accessToken;

        $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
         ])->getJson('api/bugs')->assertStatus(200);
       
    }

    /** @test */
    public function user_get_single_bug(){
        $bug = factory('App\Bug')->create();
        parent::setUp();
        \Artisan::call('passport:install');
        
        factory('App\Role')->create();
        $user = factory('App\User')->create();
        $token =  $user->createToken('authToken')->accessToken;

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
        $this->withHeaders([
            'Authorization' => 'Bearer '. $token,
         ])->postJson('/api/bugs', [
            'title'=>'test bug', 
            'description'=>'bug desc'])
            ->assertStatus(201);
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
    
}