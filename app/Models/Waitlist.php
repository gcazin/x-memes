<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $email
 */
class Waitlist extends Model
{
    use HasFactory;

    protected $table = 'waitlist';
}
