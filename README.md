# NodeJS Code Generator

A simple CLI tool to create base structures for new projects.

## How to start?

### Prepare configuration file

Create a configuration file

```
node index.js init
```

Go to the file created (config.json) and update `entities` property according your project. For example:

```json
{
  "entities": ["User", "Password", "Product", "Category", "Merchant", "Store"]
}
```

### Build your project

Execute the next command to build your new project.

```
node index.js build --lang javascript --db mongodb
```

For more information aboud the available commands and arguments, just run `node index.js`

## Usage

- Languages supported: JavaScript
- Database: MongoDB

# Credits

- Eduardo Rodríguez Patiño (https://www.linkedin.com/in/erodriguezp105/)
