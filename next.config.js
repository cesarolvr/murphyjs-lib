const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
    rehypePrettyCodeOptions: {
      theme: {
        name: "murphy-pink",
        type: "dark",
        colors: {
          "editor.background": "#2d1f1f",
          "editor.foreground": "#d3d3d3"
        },
        tokenColors: [
          {
            name: "Comments",
            scope: [
              "comment",
              "punctuation.definition.comment",
              "comment.block.html",
              "comment.line.double-slash.js",
              "comment.block.js",
              "comment.block.css"
            ],
            settings: {
              foreground: "#666666"
            }
          },
          {
            name: "Variables",
            scope: ["variable", "string constant.other.placeholder"],
            settings: {
              foreground: "#ff9696"
            }
          },
          {
            name: "Keywords",
            scope: ["keyword", "storage.type", "storage.modifier"],
            settings: {
              foreground: "#ff6b6b"
            }
          },
          {
            name: "Strings",
            scope: ["string", "string.quoted"],
            settings: {
              foreground: "#ff9898"
            }
          },
          {
            name: "Functions",
            scope: ["entity.name.function", "support.function"],
            settings: {
              foreground: "#ff7b7b"
            }
          },
          {
            name: "Numbers",
            scope: ["constant.numeric"],
            settings: {
              foreground: "#ff8b8b"
            }
          },
          {
            name: "Operators",
            scope: ["keyword.operator"],
            settings: {
              foreground: "#ff5b5b"
            }
          },
          {
            name: "Properties",
            scope: ["variable.other.property"],
            settings: {
              foreground: "#ffabab"
            }
          },
          {
            name: "HTML Tags",
            scope: ["entity.name.tag"],
            settings: {
              foreground: "#ff4b4b"
            }
          },
          {
            name: "CSS Properties",
            scope: ["support.type.property-name.css"],
            settings: {
              foreground: "#ffc6c6"
            }
          },
          {
            name: "JavaScript Keywords",
            scope: ["keyword.control", "storage.type.js"],
            settings: {
              foreground: "#ff3b3b"
            }
          },
          {
            name: "Data Murphy Base",
            scope: [
              "entity.other.attribute-name.html",
              "entity.other.attribute-name.data-murphy",
              "entity.other.attribute-name.data-murphy.html"
            ],
            settings: {
              foreground: "#ffd6d6",
              fontStyle: "italic"
            }
          },
          {
            name: "Data Murphy Animation",
            scope: [
              "entity.other.attribute-name.data-murphy-animation",
              "entity.other.attribute-name.data-murphy-animation-delay",
              "entity.other.attribute-name.data-murphy-animation-duration"
            ],
            settings: {
              foreground: "#ffb6b6",
              fontStyle: "italic"
            }
          },
          {
            name: "Data Murphy Element",
            scope: [
              "entity.other.attribute-name.data-murphy-element",
              "entity.other.attribute-name.data-murphy-element-distance",
              "entity.other.attribute-name.data-murphy-element-threshold"
            ],
            settings: {
              foreground: "#ffc6c6",
              fontStyle: "italic"
            }
          },
          {
            name: "Data Murphy Appearance",
            scope: [
              "entity.other.attribute-name.data-murphy-appearance",
              "entity.other.attribute-name.data-murphy-appearance-distance"
            ],
            settings: {
              foreground: "#ffa6a6",
              fontStyle: "italic"
            }
          },
          {
            name: "Data Murphy Other",
            scope: [
              "entity.other.attribute-name.data-murphy-ease",
              "entity.other.attribute-name.data-murphy-root",
              "entity.other.attribute-name.data-murphy-root-margin",
              "entity.other.attribute-name.data-murphy-threshold"
            ],
            settings: {
              foreground: "#ff9b9b",
              fontStyle: "italic"
            }
          }
        ]
      }
    }
  },
  defaultShowCopyCode: true,
  flexsearch: true,
  staticImage: true
});

module.exports = withNextra({
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Copy the built Murphy.js files to the public directory
      const CopyPlugin = require('copy-webpack-plugin');
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: 'dist',
              to: 'dist',
              noErrorOnMissing: true
            }
          ]
        })
      );
    }
    return config;
  }
});
