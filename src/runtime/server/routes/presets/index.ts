import { definePresetHandler } from "../../handlers";
import { getPresets } from "../../management";

export default definePresetHandler(getPresets);
