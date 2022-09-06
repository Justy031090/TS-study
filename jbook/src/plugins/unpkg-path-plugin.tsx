import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
    //what the path to the file is --> onResolve
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log('onResole', args);
                return { path: args.path, namespace: 'a' };
            });
            //trying to load the file the the onResolve step (onLoad)
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);

                //instead of loading index.js through the file system we return the contents of the file that esbuild was looking for.

                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: `
            import message from './message';
            console.log(message);
            `,
                        //if esbuild finds import statements, it goes again to a cycle of onResolve-->onLoad
                    };
                } else {
                    return {
                        loader: 'jsx',
                        contents: 'export default "hi there!"',
                    };
                }
            });
        },
    };
};
