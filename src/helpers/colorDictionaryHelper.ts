import colors from "../github-language-colors.json";

interface colorObject {
  color: string | null;
  url: string;
}
interface dictionary {
  [key: string]: colorObject;
}

const colorDictionary: dictionary = colors;

export default colorDictionary;
