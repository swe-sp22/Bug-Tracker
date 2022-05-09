<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Bug;
use Faker\Generator as Faker;

$factory->define(Bug::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence,
        'description' => $faker->paragraph,
        'status' => 'NEW'
    ];
});
