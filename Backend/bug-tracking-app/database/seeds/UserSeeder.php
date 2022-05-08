<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Super-admin is created by default when we initiate our db.
        // Note: Only admins can register acounts.
        User::insert([
            'name'=>"Ahmed super admin",
            'email'=>"ahmed@admin.com",
            'role_id'=>"1",
            'password'=>bcrypt(123456789),
        ]);
    }
}
