<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\User;

class UserAuthController extends Controller
{
    public function register(Request $request)
    {
        // Authorization
        $curr_user = Auth::user();
        if ($curr_user->role_id != 1) {
            return response(["message" => "Unauthorized, You must be an admin"]);
        }

        // Validation
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'max:255'],
            'email' => ['required','email','max:255','unique:users'],
            'role_id' => 'required',
            'password' => ['required','min:8','max:255'],
            'password_confirmed' => ['required', 'same:password']
        ]);

        if ($validator->fails()) {
            return response(
                [
                    'message' => $validator->errors()
                ],
                400
            );
        }

        // Insertion
        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'role_id'=>$request->role_id,
            'password'=>bcrypt($request->password),
        ]);
        return response($user);
    }

    public function login(Request $request)
    {
        if (! Auth::attempt($request->only('email', 'password'))) {
            return response([
                'errors' => 'Invalid credentials'
            ], 403);
        }

        $user = Auth::user();
        $token = $user->createToken('token')->accessToken;
        return response([
            'jwt'=>$token
        ]);
    }

    public function logout(Request $request)
    {
        auth('api')->user()->token()->revoke();
        return response([
            'message' => 'Logged out successfully'
        ]);
    }
}
