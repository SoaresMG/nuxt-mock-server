import { getPresets } from "../management";
import { definePresetHandler } from "../handlers";

export default definePresetHandler(getPresets);
