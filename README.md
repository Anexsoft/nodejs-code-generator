# NodeJS Code Generator

A simple CLI tool to create base structures for new projects.

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

Execute the next command to build your new project.

```
node index.js build --lang javascript --db mongodb
```

For more information about the available commands and arguments, just run `node index.js`

### Extend your templates (optional)

You can easily create and extend your templates. Go to the extensions path (`src/extensions`) and create a new template files.

```
src/extensions/database/database.js.[extension_name].hbs
src/extensions/service/service.js.[extension_name].hbs
src/extensions/repository/repository.js.[extension_name].hbs
src/extensions/domain/domain.js.[extension_name].hbs
```

Eg: to create templates for NestJS

```
src/extensions/service/service.js.nestjs.hbs
src/extensions/repository/repository.js.nestjs.hbs
src/extensions/domain/domain.js.nestjs.hbs
```

Now, just run building command

```
node index.js build --lang typescript --db mongodb --ext=nodejs
```

#### For your informnation

- You are availble to create multiple extensions, just remember to specify the name of your extensions before of `.hbs` and run the command including the name of your extension.
- If a extension is not found, original template will be used.

## Usage

- Languages supported: JavaScript
- Database: MongoDB

# Credits

- Eduardo Rodríguez Patiño (https://www.linkedin.com/in/erodriguezp105/)
