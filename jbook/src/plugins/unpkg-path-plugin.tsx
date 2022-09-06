import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
    //what the path to the file is --> onResolve
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log('onResolve', args);
                if (args.path === 'index.js')
                    return { path: args.path, namespace: 'a' };
                else if (args.path === 'tiny-test-pkg')
                    return {
                        path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js',
                        namespace: 'a',
                    };
            });
            //trying to load the file the the onResolve step (onLoad)
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);
                //instead of loading index.js through the file system we return the contents of the file that esbuild was looking for.
                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: `
            import message from 'tiny-test-pkg';
            console.log(message);
            `,
                        //if esbuild finds import statements, it goes again to a cycle of onResolve-->onLoad
                    };
                }
                const { data } = await axios.get(args.path);
                return {
                    loader: 'jsx',
                    contents: data,
                };
            });
        },
    };
};
