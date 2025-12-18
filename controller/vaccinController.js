const supabase = require('../config/supabase');


// Récupérer tous les vaccins
async function getAllVaccins(req, res) {
    try {
        const { data, error } = await supabase
            .from('vaccins')
            .select('*');

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Liste des vaccins recuperee avec succes',
            data: data
        });
    } catch (error) {
        console.error('Erreur lors de la recuperation des vaccins :', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la recuperation des vaccins'
        });
    }
}

// Récupérer un vaccin par espece
async function getVaccinByEspece(req, res) {
    const { espece } = req.params;

    if (!espece) {
        return res.status(400).json({
            success: false,
            message: 'Le parametre espece est requis'
        });
    }

    try {
        const { data, error } = await supabase
            .from('vaccins')
            .select('*')
            .eq('espece', espece);

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Liste des vaccins recuperee avec succes',
            data: data
        });
    } catch (error) {
        console.error('Erreur lors de la recuperation des vaccins :', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la recuperation des vaccins'
        });
    }
}

//ajouter un vaccin
async function addVaccin(req, res) {
    const { espece, nom, description, intervalle_jours, nb_doses_primaires } = req.body;

    try {
        const { data, error } = await supabase
            .from('vaccins')
            .insert([
                {
                    espece: espece,
                    nom: nom,
                    description: description,
                    intervalle_jours: intervalle_jours,
                    nb_doses_primaires: nb_doses_primaires,
                    active : true
                }
            ])
            .select();

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Vaccin ajoutee avec succes',
            data: data
        });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du vaccin :', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de l\'ajout du vaccin'
        });
    }
}

module.exports = {
    getAllVaccins,
    getVaccinByEspece,
    addVaccin
};