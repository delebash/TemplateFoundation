{
    "main": "js/bootstrap",
    "files": null,
    "ignore": [
    "dist/js/npm"
],
    "directories": {
    "lib": "dist"
},
    "shim": {
    "js/bootstrap": {
        "deps": [
            "jquery",
            "tether"
        ],
            "exports": "$"
    }
},
    "dependencies": {
    "jquery": "github:components/jquery",
        "tether": "github:HubSpot/tether@^1.1.1"
}
}