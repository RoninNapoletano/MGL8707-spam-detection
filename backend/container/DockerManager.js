const { spawnSync } = require('child_process');

class DockerManager{
    constructor(orderedSpambaseFeatures){
        this.dockerRunCommand = `docker run -p 3001:3001 -e INPUT_DATA="${JSON.stringify(orderedSpambaseFeatures).replace(/"/g, '\\"')}" modele_uci:latest`;
    }

        createDocker(){
            try {
                const result = spawnSync(this.dockerRunCommand, { shell: true, stdio: 'pipe', encoding: 'utf-8' });
                if (result.error) {
                    return { success: false, error: 'Une erreur est survenue durant la prédiction.' };
                } else {
                    try {
                        const parsedOutput = JSON.parse(result.stdout);
                        return { success: true, prediction: parsedOutput };
                    } catch (error) {
                        return { success: false, error: 'Erreur lors de l\'analyse de la sortie JSON.' };
                    }
                }
            } catch (error) {
                return { success: false, error: 'Une erreur est survenue lors de l\'exécution du conteneur Docker.' };
            }
        }

}
module.exports = DockerManager;