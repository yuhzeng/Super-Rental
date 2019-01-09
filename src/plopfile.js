module.exports = (plop) => {

    plop.setGenerator("crud-fire-service", {
        description: "Create a new service",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is your service name?"
            }
        ],
        actions: [
            {
                type: "add",
                path: "app/services/{{dashCase name}}/{{dashCase name}}.service.ts",
                templateFile: "plop-templates/service.ts"
            },
            {
                type: "add",
                path: "app/services/{{dashCase name}}/{{dashCase name}}.spec.ts",
                templateFile: "plop-templates/service.spec.ts"
            },
            {
                type: "append",
                path: "app/services/service-export.ts",
                template: "export * from './{{dashCase name}}/{{dashCase name}}.service';"
            },
        ]
    });

    plop.setGenerator("model", {
        description: "Create a new model",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is your model name?"
            }
        ],
        actions: [
            {
                type: "add",
                path: "app/models/{{dashCase name}}.ts",
                templateFile: "plop-templates/model.ts"
            },
            {
                type: "append",
                path: "app/models/model-export.ts",
                template: "export * from './{{dashCase name}}';"
            },
        ]
    });
};