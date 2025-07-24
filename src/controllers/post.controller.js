const { post } = require('../app');
const Post = require('../models/post.model');

//obtener todos los post (GET)
exports.getAllPost = async (req, res) => {
try {
    const posts = await Post.find();
    res.json(posts)
} catch (err) {
    res.status(500).json({message: 'Error al obtener todos los posts', error: err.message });
}
};

//obtener post por id (GET)
exports.getPostById = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) return res.json(post);
        return res.status(401).json({message: 'Post no encontrado'});
    } catch (err) {
        return res.status(500).json({message: 'Error al obtener el post', error: err.message});
    }
};

// crear post 
exports.createPost = async (req,res) => {
    const post = new Post(req.body);
    await post.save();
    return res.status(201).json(post)
};

// Actualiza datos de post por id
exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        return res.json({
            message: 'Post actualizado correctamente',
            post: updatedPost
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error al actualizar el post',
            error: err.message
        });
    }
};

//delete post
exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        return res.json({
            message: 'Post eliminado correctamente',
            post: deletedPost
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error al eliminar el post',
            error: err.message
        });
    }
};