declare module "matchmediaquery" {
    function matchMedia(
        query: string,
        values: import("react-responsive").MediaQueryMatchers,
        forceStatic: boolean,
    ): MediaQueryList;

    export default matchMedia;
}
