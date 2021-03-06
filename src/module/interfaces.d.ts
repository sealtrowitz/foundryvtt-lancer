
import { LancerPilot, LancerNPC, LancerDeployable } from './actor/lancer-actor'
import { LancerSkill, LancerTalent, LancerCoreBonus, LancerLicense, LancerFrame } from './item/lancer-item';
import { DamageType, RangeType, WeaponSize, WeaponType, SystemType, MechType, ItemType, PilotEquipType } from './enums';

// ------------------------------------------------------
// |       UTILITY DATA TYPES                           |
// ------------------------------------------------------

// TODO: several of these may be moved to classes later to enable specialized logic

declare interface TagData {
  id: string;
  name: string;
  description: string;
  val: number | string;
}

declare interface RangeData {
  type: RangeType;
  val: number;
  override?: boolean;
  bonus?: number;
}

declare interface DamageData {
  type: DamageType;
  val: string | number;
  override?: boolean;
}

// ------------------------------------------------------
// |       ACTOR DATA TYPES                             |
// ------------------------------------------------------

// ------- Actor data templates -------------------------
declare interface ResourceData {
  value: number;
  min: number;
  max: number;
}

declare interface LancerMechData {
  frame: string;
  size: number;
  hull: number;
  agility: number;
  systems: number;
  engingeering: number;
  hp: ResourceData;
  structure: ResourceData;
  heat: ResourceData;
  stress: ResourceData;
  armor: number;
  speed: number;
  evasion: number;
  edef: number;
  sensors: number;
  save: number;
}

declare interface LancerMechLoadoutData {
  mounts: object[]; // TODO
  systems: LancerMechSystemData[];
}

// ------- Pilot data ----------------------------------
declare interface LancerPilotStatsData {
  size: number;
  hp: ResourceData;
  armor: number;
  evasion: number;
  edef: number;
  speed: number;
}

declare interface LancerPilotLoadoutData {
  armor: LancerPilotArmorData;
  weapons: LancerPilotWeaponData[];
  gear: LancerPilotGearData[];
}

declare interface LancerPilotSubData {
  level: number;
  grit: number;
  callsign: string;
  status: string;
  notes: string;
  quirk: string;
  background: string;
  history: string;
  stats: LancerPilotStatsData;
  loadout: LancerPilotLoadoutData;
  licenses: LancerLicenseData[];
  skills: LancerSkillData[];
  talents: LancerTalentData[];
  core_bonuses: LancerCoreBonusData[];
  reserves: Item[]; // TODO: reserve data type
}

declare interface LancerPilotData extends ActorData {
  pilot: LancerPilotSubData;
  mech: LancerMechData;
  loadout: LancerMechLoadoutData;
}

declare interface LancerPilotSheetData extends ActorSheetData {
  actor: LancerPilot;
  data: LancerPilotData;
}

// ------- NPC data ---------------------------------------------
declare interface LancerNPCData extends ActorData {
  mech: LancerMechData;
  type: string;
  class: string;
  npc_templates: string[];
  activations: number;
  features: Item[]; // TODO: NPC feature data type
}

declare interface LancerNPCSheetData extends ActorSheetData {
  actor: LancerNPC;
  data: LancerNPCData;
}

// ------- Deployable data --------------------------------------
declare interface LancerDeployableData extends ActorData {
  size: number;
  hp: ResourceData;
  armor: number;
  evasion: number;
  edef: number;
  description: string;
  effect: string;
}

declare interface LancerDeployableSheetData extends ActorSheetData {
  actor: LancerDeployable;
  data: LancerDeployableData;
}

// ------------------------------------------------------
// |       ITEM DATA TYPES                             |
// ------------------------------------------------------

// -------- Item data templates -------------------------
declare interface LancerCompendiumItemData {
  id: string;
  name: string;
  description: string;
  note: string;
  item_type: ItemType;
  flavor_name: string;
  flavor_description: string;
}

declare interface LancerPilotEquipmentData {
  tags: TagData[];
}

declare interface LancerLicensedItemData extends LancerCompendiumItemData {
  source: string;
  license: string;
  license_level: number;
}

declare interface LancerMechEquipmentData {
  sp: number;
  uses: number;
  max_uses: number;
  max_use_override: number;
  destroyed: boolean;
  cascading: boolean;
  loaded: boolean;
  tags: TagData[];
  effect: object[]; // TODO: replace with specific type
  integrated: boolean;
  // TODO: not needed? Needed in Comp/Con for some of its mech building logic.
  // talent_item: boolean; 
  // frame_id: boolean;
}

// -------- Skill Trigger data -----------------------------------
declare interface LancerSkillData {
  id: string;
  name: string;
  description: string;
  detail: string;
  rank: number;
}

declare interface LancerSkillEntityData extends ItemData {
  data: LancerSkillData;
}

declare interface LancerSkillSheetData extends ItemSheetData {
  item?: LancerSkill;
  data?: LancerSkillData;
}

// -------- Talent data ------------------------------------------
declare interface LancerTalentData {
  id: string;
  name: string;
  description: string;
  ranks: {
    name: string; 
    description: string
  }[];
  rank: number;
}

declare interface LancerTalentEntityData extends ItemData {
  data: LancerTalentData;
}

declare interface LancerTalentSheetData extends ItemSheetData {
  item?: LancerTalent;
  data?: LancerTalentData;
}

// -------- Core Bonus data --------------------------------------
declare interface LancerCoreBonusData {
  id: string;
  name: string;
  source: string;
  effect: string;
  mounted_effect: string;
}

declare interface LancerCoreBonusEntityData extends ItemData {
  data: LancerCoreBonusData;
}

declare interface LancerCoreBonusSheetData extends ItemSheetData {
  item?: LancerCoreBonus;
  data?: LancerCoreBonusData;
}

// -------- License data -----------------------------------------
declare interface LancerLicenseData {
  name: string;
  source: string;
  rank: number;
}

declare interface LancerLicenseEntityData extends ItemData {
  data: LancerLicenseData;
}

declare interface LancerLicenseSheetData extends ItemSheetData {
  item?: LancerLicense;
  data?: LancerLicenseData;
}

// -------- Pilot Armor data -------------------------------------
declare interface LancerPilotArmorData extends LancerCompendiumItemData, LancerPilotEquipmentData {
  hp_bonus: number;
  speed: number;
  speed_bonus: number;
  armor: number;
  edef: number;
  edef_bonus: number;
  evasion: number;
  evasion_bonus: number;
}

declare interface LancerPilotArmorEntityData extends ItemData {
  data: LancerPilotArmorData;
}

// -------- Pilot Weapon data ------------------------------------
declare interface LancerPilotWeaponData extends LancerCompendiumItemData, LancerPilotEquipmentData {
  range: RangeData[];
  damage: DamageData[];
  effect: string;
  custom_damage_type: DamageType;
}

declare interface LancerPilotWeaponEntityData extends ItemData {
  data: LancerPilotWeaponData;
}

// -------- Pilot Gear data --------------------------------------
declare interface LancerPilotGearData extends LancerCompendiumItemData, LancerPilotEquipmentData {
  uses: number;
  current_uses: number;
}

declare interface LancerPilotGearEntityData extends ItemData {
  data: LancerPilotGearData;
}

// -------- Frame data -------------------------------------------
declare interface LancerFrameStatsData {
  size: number;
  armor: number;
  hp: number;
  evasion: number;
  edef: number;
  heatcap: number;
  repcap: number;
  sensor_range: number;
  tech_attack: number;
  save: number;
  speed: number;
  sp: number;
}

declare interface LancerCoreSystemData {
  name: string;
  description: string;
  integrated?: { id: string }
  passive_name?: string
  passive_effect?: string
  active_name: string;
  active_effect: string;
  tags: TagData[];
}

declare interface LancerFrameData extends LancerLicensedItemData {
  mechtype: MechType[];
  stats: LancerFrameStatsData;
  mounts: object[]; // TODO: replace with specific type
  core_system: LancerCoreSystemData;
}

declare interface LancerFrameEntityData extends ItemData {
  data: LancerFrameData;
}

declare interface LancerFrameSheetData extends ItemSheetData {
  item?: LancerFrame;
  data?: LancerFrameData;
}

// -------- Mech System data -------------------------------------
declare interface LancerMechSystemData extends LancerLicensedItemData, LancerMechEquipmentData {
  system_type: SystemType;
}

declare interface LancerMechSystemEntityData extends ItemData {
  data: LancerMechSystemData;
}

// -------- Mech Weapon data -------------------------------------
declare interface LancerMechWeaponData extends LancerLicensedItemData, LancerMechEquipmentData {
  mount: WeaponSize;
  weapon_type: WeaponType;
  damage: DamageData[];
  range: RangeData[];
  mod: object | null; // TODO: weapon mod type
  custom_damage_type: DamageType;
}

declare interface LancerMechWeaponEntityData extends ItemData {
  data: LancerMechWeaponData;
}
