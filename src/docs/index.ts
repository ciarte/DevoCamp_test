import docsSwagger from "./docs.json";

import pathsEmpresas from "./empresas/paths.json";
import pathsPostulantes from "./postulantes/paths.json";

import schemaEmpresas from "./empresas/schema.json";
import schemaPostulantes from "./postulantes/schema.json";

const objConfigSwagger = {
    ...docsSwagger,
    "paths": {
        ...pathsEmpresas,
        ...pathsPostulantes
    },
    "components": {
        "schemas": {
            ...schemaEmpresas,
            ...schemaPostulantes
        }
        // "parameters": {}    Create a file for the parameters. "parameters.json" 
        // "paths": {}         Create a file for the paths. "paths.json"
        // "responses": {}     Create a file for the responsers. "responses.json"
        // "headers": {}       Create a file for the headers. "headers.json"
    }
}

export default objConfigSwagger;