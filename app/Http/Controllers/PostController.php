<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Traits\ApiResponser;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    use ApiResponser;

    public function create(Request $request): JsonResponse {
        $attr = $request->validate([
            'title' => 'string|required|min:3|max:255',
            'content' => 'string|required|min:25|max:2048',
            'image' => 'required|image:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_uploaded_path = $image->store('storage/app/public/images', 'public');
        } else {
            $image_uploaded_path = '';
        }

        $post = Post::create([
            'title' => $attr['title'],
            'content' => $attr['content'],
            'image_url' => $image_uploaded_path,
            'user_id' => auth()->id()
        ]);

        return $this->success($post, 'Post created successfully');
    }

    public function index(Request $request): JsonResponse {
        if ($request->user()->user_type !== 'admin') {
            $posts = Post::where('approved', true)->with('user')->get();
        } else {
            $posts = Post::with('user')->get();
        }
        return $this->success($posts);
    }

    public function delete(Request $request): JsonResponse {
        $attr = $request->validate([
            'post_id' => 'integer|required'
        ]);

        $del = Post::find($attr['post_id']);
        if (!$del) {
            return $this->error('', 'Post not found');
        } else {
            $del->delete();
            return $this->success('', 'Post deleted successfully');
        }
    }

    public function update(Request $request): JsonResponse {
        $attr = $request->validate([
            'post_id' => 'integer|required',
            'approved' => 'boolean'
        ]);

        $post = Post::find($attr['post_id']);
        $post->update(['approved' => $attr['approved']]);
        return $this->success($post, 'Post updated successfully');
    }
}
