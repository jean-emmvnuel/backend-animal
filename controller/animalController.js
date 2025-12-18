const supabase = require('../config/supabase');

// Récupérer tous les animaux
async function getAllAnimals(req, res) {
    try {
        const { data, error } = await supabase
            .from('animaux')
            .select('*');

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            message : 'Liste des animaux récupérée avec succès',
            data: data
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des animaux :', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la récupération des animaux'
        });
    }
}

// Ajouter un animal 
async function addAnimal(req, res) {
    const { nom, espece, race, sexe, date_de_naissance, couleur } = req.body;

    try {
        const { data, error } = await supabase
            .from('animaux')
            .insert([
                { 
                    nom: nom, 
                    espece: espece, 
                    owner_id: "3f5bda74-f0ec-42ac-a6e4-d2f6bef7b5b1",
                    race: race, 
                    sexe: sexe, 
                    date_naissance: date_de_naissance, 
                    couleur: couleur
                }
            ])
            .select();

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Animal ajouté avec succès',
            data: data
        });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'animal :', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de l\'ajout de l\'animal'
        });
    }
}

// modifier un animal par son ID
async function updateAnimalById(req, res) {
    const { id } = req.params;
    const { nom, espece, race, sexe, date_de_naissance, couleur } = req.body;

    try {
        const { data, error } = await supabase
            .from('animaux')
            .update({
                nom: nom,
                espece: espece,
                race: race,
                sexe: sexe,
                date_naissance: date_de_naissance,
                couleur: couleur
            })
            .eq('id', id)
            .select();

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Animal modifié avec succès',
            data: data
        });
    } catch (error) {
        console.error('Erreur lors de la modification de l\'animal :', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la modification de l\'animal'
        });
    }
}

//supprimer un animal par son ID
async function deleteAnimalById(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('animaux')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Animal supprimé avec succès',
            data: data
        });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'animal :', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la suppression de l\'animal'
        });
    }
}


module.exports = {
    getAllAnimals,
    addAnimal,
    updateAnimalById,
    deleteAnimalById
};