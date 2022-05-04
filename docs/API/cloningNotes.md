# Packages
Always remember to run : 
composer update 
composer install
to install the newly used packages

# Migration
To migrate new tables and seeders run: php artisan migrate --seed
To migrate and overwright existing tables run: php artisan migrate:fresh --seed
# To use authentication
After the above two steps:
To generate Personal access client run: php artisan passport:install
