# NodeJS Code Generator

A simple CLI tool for create base code structures for new projects. This tool follow First Code philosophy.

## How to start?

### Prepare configuration file

Create a configuration file

```
node index.js init
```

Go to the file created (config.json) and update `domains` property according your project. For example:

```json
{
  "domains": ["User", "Password", "Product", "Category", "Merchant", "Store"]
}
```

**Note**: _any word added must be written in singular_

### Build your project

To create a template for javascript and mongodb project just run the next command:

```
node index.js build --lang javascript --db mongodb
```

The output of your project is on the **build directory**.

For more information about the available commands and arguments, just run `node index.js`

### Extend your templates (optional)

You can easily create and extend your templates. Go to the path (`src/templates`) and create a new template file.

```
src/templates/database/database.js.[extension_name].hbs
src/templates/service/[database]/service.js.[extension_name].hbs
src/templates/repository/[database]/repository.js.[extension_name].hbs
src/templates/domain/[database]/domain.js.[extension_name].hbs
```

Eg: to create templates for NestJS

```
src/templates/service/mongodb/service.js.nestjs.hbs
src/templates/repository/mongodb/repository.js.nestjs.hbs
src/templates/domain/mongodb/domain.js.nestjs.hbs
```

And for buid your project including your template files, just execute the next command.

```
node index.js build --lang typescript --db mongodb --tmpl=nestjs
```

#### For your information

- You are availble to create multiple extensions, just remember to specify the name of your extensions before of `.hbs` and run the command including the name of your extension.
- If an extension is not found, original template will be used.

### Available Templates

|           | TypeScript | JavaScript | CSharp | PHP | Python |
| --------- | ---------- | ---------- | ------ | --- | ------ |
| MongoDB   | X          | X          |        |     |        |
| MySQL     | X          | X          |        |     |        |
| MSSQL     |            |            |        |     |        |
| Postgress |            |            |        |     |        |
| DynamoDb  |            |            |        |     |        |

# Credits

- Eduardo Rodríguez Patiño (https://www.linkedin.com/in/erodriguezp105/)
