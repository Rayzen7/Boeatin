<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comments;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($productId)
    {
        $comments = Comments::where('product_id', $productId)->with('user')->get();
        return response()->json($comments);
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
    public function store(Request $request, $productId)
    {
        $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'comment' => 'required|string|max:500',
        ]);

        $comment = Comments::create([
            'product_id' => $productId,
            'user_id' => $request->user_id,
            'comment' => $request->comment,
        ]);

        return response()->json($comment, 201);
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
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $comment = Comments::findOrFail($id);

        $comment->delete();
        return response()->json(null, 204);
    }
}
