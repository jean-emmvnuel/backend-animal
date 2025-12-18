const supabase = require("../config/supabase");


// Controller pour la connexion utilisateur
async function Login(req, res) {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Utilisateur connecté avec succès',
            data: {token : data.session.access_token}
        });
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'utilisateur :', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la connexion de l\'utilisateur'
        });
    }
}

// Controller pour l'inscription utilisateur
async function Register(req, res) {
    const { email, password, nom_prenom } = req.body;

    try {
        // on va vérifier si l'utilisateur existe déjà
        const { data: existingUsers, error: checkError } = await supabase
            .from('utilisateurs')
            .select('id')
            .eq('email', email)
            .single();

        // s'il existe on va retourner un message d'erreur
        if (existingUsers) {
            return res.status(400).json({
                success: false,
                message: 'Un utilisateur avec cet email existe déjà'
            });
        }

        // creeons l'utilisateur dans supabase auth
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    nom_prenom: nom_prenom
                }
            }
        });

        if (error) {
            throw error;
        }

        // inserons l'utilisateur dans la table utilisateurs
        const { data2, error: error2 } = await supabase
            .from('utilisateurs')
            .insert([
                {
                    id: data.user.id,
                    email: email,
                    nom_prenom: nom_prenom
                }
            ])
            .select();

        if (error2) {
            throw error2;
        }

        res.status(200).json({
            success: true,
            message: 'Utilisateur inscrit avec succès',
            data: data.user
        });
    } catch (error) {
        console.error('Erreur lors de l\'inscription de l\'utilisateur :', error);
        
        // ajoute plus de détails pour les erreurs de conflit d'unicité
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                message: 'Cet utilisateur existe déjà'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de l\'inscription de l\'utilisateur'
        });
    }
}
module.exports = {
    Login,
    Register
};