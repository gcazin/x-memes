<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function __construct(
        protected UserRepository $userRepository
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Users', [
            'users' => $this->userRepository->paginate(),
            'roles' => Role::all()->map->only(['id', 'name'])->all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, int $id)
    {
        $user = $this->userRepository->find($id);

        if ($request->roles) {
            $role = Role::find($request->roles);

            $user->assignRole($role);
        } else {
            $role = $user->roles->first();
            $user->removeRole($role);
        }

        flash('success', "L'utilisateur a bien été modifié.");
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(string $id)
    {
        $user = $this->userRepository->find($id);

        $user->medias()->delete();
        $user->likes()->delete();

        $user->delete();
    }
}
