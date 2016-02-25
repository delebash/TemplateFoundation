{
    "main": "dist/foundation",
        "files": ["dist", "assets", "js", "scss"],
        "shim": {
        "dist/foundation": {
            "deps": "jQuery",
                "exports": "$"
        }
    },
    "dependencies": {
        "jQuery": "github:components/jquery"
    }
}