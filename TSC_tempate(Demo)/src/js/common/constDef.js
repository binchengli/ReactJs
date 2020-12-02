/* collect general function component unrelated */
/* define constant class by object */
const deviceType = {
    DEVICE_TYPE_AP     : 0,
    DEVICE_TYPE_SWITCH : 1
};
const accAuth = {
    ACCOUNT_AUTH_ROOT       : 0,
    ACCOUNT_AUTH_ADMIN      : 1,
    ACCOUNT_AUTH_OPERATOR   : 2,
    ACCOUNT_AUTH_GUEST      : 3,
    ACCOUNT_AUTH_OWNER      : 4
};
const sortType = {
    SORTTYPE_ASC: 'asc', 
    SORTTYPE_DES: 'desc'
};
const wireless_24g = {
    WIRELESSMODE_24G_BGN_MANUAL : 1,
    WIRELESSMODE_24G_B          : 18,
    WIRELESSMODE_24G_G          : 34,
    WIRELESSMODE_24G_GN         : 98,
    WIRELESSMODE_24G_BGN        : 114
};
const wireless_5g = {
    WIRELESSMODE_5G_AN_MANUAL : 1,
    WIRELESSMODE_5G_A         : 12,
    WIRELESSMODE_5G_AN        : 76,
    WIRELESSMODE_5G_ANAC      : 204
};
const bandwidth = {
    BANDWIDTH_20                            : 0,
    BANDWIDTH_20_40                         : 1,
    BANDWIDTH_40                            : 2,
    BANDWIDTH_20_40_LOWER_EXTENSION_CHANNEL : 3,
    BANDWIDTH_20_40_UPPER_EXTENSION_CHANNEL : 4,
    BANDWIDTH_40_LOWER_EXTENSION_CHANNEL    : 5,
    BANDWIDTH_40_UPPER_EXTENSION_CHANNEL    : 6,
    BANDWIDTH_80                            : 7
};
const bandsteering = {
    BANDSTEERING_DISABLED       : 0,
    BANDSTEERING_PREFER_5G      : 1,
    BANDSTEERING_BALANCED       : 2,
    BANDSTEERING_USER_DEFINED   : 3
};
const wlan_enc = {
    WLAN_ENC_NONE    : 0,
    WLAN_ENC_WEP     : 1,
    WLAN_ENC_TKIP    : 2,
    WLAN_ENC_AES     : 3,
    WLAN_ENC_TKIPAES : 4
};
const wlan_auth = {
    WLAN_AUTH_WEP_OPEN        : 0,
    WLAN_AUTH_WEP_AUTO        : 1,
    WLAN_AUTH_WEP_SHARED      : 2,
    WLAN_AUTH_WPA_PSK         : 3,
    WLAN_AUTH_WPA_RADIUS      : 4,
    WLAN_AUTH_WPA2_PSK        : 5,
    WLAN_AUTH_WPA2_RADIUS     : 6,
    WLAN_AUTH_WPA1WPA2_RADIUS : 7,
    WLAN_AUTH_WPA1PSKWPA2_PSK : 8
};
const wlan_ts = {
    WLAN_TS_DISABLED    : 0,
    WLAN_TS_BY_SSID     : 1
};
const wlan_atf_type = {
    WLAN_ATF_TYPE_AUTO      : 0,
    WLAN_ATF_TYPE_STATIC    : 1,
    WLAN_ATF_TYPE_DISABLED  : 2
};
const wlan_acl_type = {
    WLAN_ACL_TYPE_WHITE     : 0,
    WLAN_ACL_TYPE_BLACK     : 1
};
const sec_mod = {
    SEC_MOD_DISABLED          : 0,
    SEC_MOD_WEP               : 1,
    SEC_MOD_WPA_PRESHARED_KEY : 2,
    SEC_MOD_WPA_RADIUS        : 3,
    SEC_MOD_WEP_RADIUS        : 4
};
const pskkey_type = {
    PSK_KEY_TYPE_PASSPHRASE   : 0,
    PSK_KEY_TYPE_HEX          : 1,
}
const add_auth = {
    ADD_AUTH_NONE               : 0,
    ADD_AUTH_MAC_FILTER         : 1,
    ADD_AUTH_MAC_FILTER_RADIUS  : 2,
    ADD_AUTH_MAC_RADIUS         : 3
};
const lan_type = {
    LAN_TYPE_STATIC     : 0,
    LAN_TYPE_DHCPCLIENT : 1,
    LAN_TYPE_DHCPSERVER : 2
};
const dns_type = {
    DNS_USER_DEFINE : 0,
    DNS_FROM_DHCP   : 1
};
const guestportal_type = { // reserve other types
    GUESTPORTL_AUTH_TYPE_FREE       : 0,
    GUESTPORTL_AUTH_TYPE_SLA        : 1,
    GUESTPORTL_AUTH_TYPE_STATIC     : 2,
    GUESTPORTL_AUTH_TYPE_DYNAMIC    : 3,
    GUESTPORTL_AUTH_TYPE_EXTERNAL   : 4,
    GUESTPORTL_AUTH_TYPE_PASSCODE   : 5
};
const guestportal_port = {
    GUESTPORTL_TYPE_HTTP  : 0,
    GUESTPORTL_TYPE_HTTPS : 1
};
const guestaccess_type = {
    GUESTACCESS_DISABLED : 0,
    GUESTACCESS_DENYALL  : 1,
    GUESTACCESS_ALLOWALL : 2,
    GUESTACCESS_INTERNAL : 3
};
const vlanport_type = {
    VLANPORT_UNTAGGED   : 0,
    VLANPORT_TAGGED     : 1
};
/* define constant */
const ConstDef = {
    /* others */
    ICHECK_STYLE :  'icheckbox_square-grey',
    IRADIO_STYLE :  'iradio_square-grey',
    IMAGE_MAX_SIZE: 1048576,
    ONLINEMAPURL:   'https://maps.googleapis.com/maps/api/js?v=3&libraries=geometry,drawing,places&key=',

    /* Device Type */
    ...deviceType,
    /* Account Authentication */
    ...accAuth,
    /* Sort type */
    ...sortType,
    /* Wireless Mode (band 2.4g) */
    ...wireless_24g,
    /* Wireless Mode (band 5g) */
    ...wireless_5g,
    /* Wireless extension channel */
    ...bandwidth,
    /* Band Steering */
    ...bandsteering,
    /* Encryption */
    ...wlan_enc,
    /* Authentication */
    ...wlan_auth,
    /* Traffic Shaping */
    ...wlan_ts,
    /* Airtime Fairness */
    ...wlan_atf_type,
    /* Access Control List */
    ...wlan_acl_type,
    /* Security Mode*/
    ...sec_mod,
    /* psk key type */
    ...pskkey_type,
    /* Addinational Authentication */
    ...add_auth,
    /* LAN type */
    ...lan_type,
    /* DNS type */
    ...dns_type,
    /* Guest portal type */
    ...guestportal_type,
    /* Guest portal port */
    ...guestportal_port,
    /* guest network ip filter */
    ...guestaccess_type,
    /* vlan port type */
    ...vlanport_type
};
export default ConstDef;

/* define array */
export const deviceStatusTbl = new Array(
    {textIndex: 505,    color: 'gray'},     //  0: Ready (reserve)
    {textIndex: 506,    color: 'yellow'},   //  1: Authenticating
    {textIndex: 507,    color: 'red'},      //  2: Authentication Fail
    {textIndex: 106,    color: 'green'},    //  3: Active
    {textIndex: 508,    color: 'sync'},     //  4: Synchronizing
    {textIndex: 509,    color: 'orange'},   //  5: Configuring
    {textIndex: 510,    color: 'gray'},     //  6: Idle (reserve)
    {textIndex: 511,    color: 'gray'},     //  7: Disconnected
    {textIndex: 512,    color: 'red'},      //  8: Incompatible NMS Version
    {textIndex: 513,    color: 'sync'},     //  9: Firmware Downloading
    {textIndex: 514,    color: 'red'},      // 10: Firmware Download Fail
    {textIndex: 515,    color: 'orange'},   // 11: Firmware Upgrading
    {textIndex: 516,    color: 'red'},      // 12: Invalid Certificate
    {textIndex: 506,    color: 'yellow'},   // 13: Authenticating (reserve)
    {textIndex: 823,    color: 'red'},      // 14: Certificate Locked
    {textIndex:   0,    color: 'sync'},     // 15: Sensor Firmware Downloading (reserve)
    {textIndex:   0,    color: 'red'},      // 16: Sensor Firmware Download Fail (reserve)
    {textIndex:   0,    color: 'orange'},   // 17: Sensor Firmware Upgrading (reserve)
    {textIndex:   0,    color: 'red'}       // 18: Sensor Firmware Upgrade Fail (reserve)
);
export const switchPortStatusTbl = new Array(
    {textIndex: 459,    color: 'gray'},
    {textIndex: 517,    color: 'gray'},
    {textIndex: 518,    color: 'gray'},
    {textIndex: 519,    color: 'gray'},
    {textIndex: 520,    color: 'gray'},
    {textIndex: 521,    color: 'gray'},
    {textIndex: 522,    color: 'gray'},
    {textIndex: 523,    color: 'gray'}
);
export const dayTbl = new Array(
    {textIndex: 790}, // Sun.
    {textIndex: 791}, // Mon.
    {textIndex: 792}, // Tue.
    {textIndex: 793}, // Wed.
    {textIndex: 794}, // Thu.
    {textIndex: 795}, // Fri.
    {textIndex: 796}  // Sat.
);
export const ntpOptions = new Array(
    {textIndex: 420,    path: '0.pool.ntp.org',                 value: 0},
    {textIndex: 421,    path: '0.africa.pool.ntp.org',          value: 1},
    {textIndex: 422,    path: '0.asia.pool.ntp.org',            value: 2},
    {textIndex: 423,    path: '0.europe.pool.ntp.org',          value: 3},
    {textIndex: 424,    path: '0.north-america.pool.ntp.org',   value: 4},
    {textIndex: 425,    path: '0.oceania.pool.ntp.org',         value: 5},
    {textIndex: 426,    path: '0.south-america.pool.ntp.org',   value: 6},
    {textIndex: 298,    path: '',                               value: 99}
);
export const speedOptions = new Array(
    {textIndex: 414,    value:0},
    {textIndex: 415,    value:1},
    {textIndex: 416,    value:2},
    {textIndex: 417,    value:3},
    {textIndex: 418,    value:4},
    {textIndex: 419,    value:5}
);
export const timeIntervalOptions = new Array(
    {textIndex: 782,    value: 99},
    {textIndex: 298,    value: 0},
    {textIndex: 342,    value: 1},
    {textIndex: 343,    value: 7},
    {textIndex: 344,    value: 14},
    {textIndex: 345,    value: 30}
);
export const pagedOptions = new Array(
    {value: 10},
    {value: 25},
    {value: 50},
    {value: 100},
);
export const bandSteeringOptions = new Array(
    {textIndex: 769, value: bandsteering.BANDSTEERING_DISABLED},
    {textIndex: 770, value: bandsteering.BANDSTEERING_PREFER_5G},
    {textIndex: 771, value: bandsteering.BANDSTEERING_BALANCED},
    {textIndex: 298, value: bandsteering.BANDSTEERING_USER_DEFINED}
);
export const minRSSIOption = new Array(
    {value: 40},
    {value: 35},
    {value: 30},
    {value: 25},
    {value: 20},
    {value: 15},
    {value: 10},
    {value:  5},
    {value:  0},
);

/* switch for software */
export const accAuthOptions = ('cloud' == process.env['PRODUCT'])?
new Array(
    {textIndex: 845, value: accAuth.ACCOUNT_AUTH_OWNER},
    {textIndex: 156, value: accAuth.ACCOUNT_AUTH_ADMIN},
    {textIndex: 157, value: accAuth.ACCOUNT_AUTH_OPERATOR},
    {textIndex: 158, value: accAuth.ACCOUNT_AUTH_GUEST}
) :
new Array(
    {textIndex: 156, value: accAuth.ACCOUNT_AUTH_ADMIN},
    {textIndex: 157, value: accAuth.ACCOUNT_AUTH_OPERATOR},
    {textIndex: 158, value: accAuth.ACCOUNT_AUTH_GUEST}
);

export const authMethOptions = new Array(
    {textIndex: 248, value: sec_mod.SEC_MOD_DISABLED},
    {textIndex: 252, value: sec_mod.SEC_MOD_WEP_RADIUS},
    {textIndex: 249, value: sec_mod.SEC_MOD_WEP},
    {textIndex: 250, value: sec_mod.SEC_MOD_WPA_PRESHARED_KEY},
    {textIndex: 251, value: sec_mod.SEC_MOD_WPA_RADIUS}
);
export const keyLengthOptions = new Array(
    {textIndex: 254, value: 64},
    {textIndex: 255, value: 128},
);
export const keyTypeOptions = new Array(
    {textIndex: 258, value: 1, char_64: 5, char_128: 13},
    {textIndex: 257, value: 0, char_64: 10, char_128: 26}
);
export const keyIndexOptions = new Array(
    {textIndex: 261, value: 0},
    {textIndex: 261, value: 1},
    {textIndex: 261, value: 2},
    {textIndex: 261, value: 3}
);
export const vlanPortOptions = new Array(
    {textIndex: 262, value: vlanport_type.VLANPORT_UNTAGGED},
    {textIndex: 263, value: vlanport_type.VLANPORT_TAGGED}
);
export const checkChannelIntervalTimeOptions = new Array(
    {textIndex: 264, value: 0},
    {textIndex: 265, value: 1},
    {textIndex: 266, value: 2},
    {textIndex: 267, value: 3},
    {textIndex: 268, value: 4},
    {textIndex: 269, value: 5}
);
export const wpaModeOptions = new Array(
    {textIndex: 271, value_psk: wlan_auth.WLAN_AUTH_WPA_PSK,         value_eap: wlan_auth.WLAN_AUTH_WPA_RADIUS},
    {textIndex: 272, value_psk: wlan_auth.WLAN_AUTH_WPA2_PSK,        value_eap: wlan_auth.WLAN_AUTH_WPA2_RADIUS},
    {textIndex: 273, value_psk: wlan_auth.WLAN_AUTH_WPA1PSKWPA2_PSK, value_eap: wlan_auth.WLAN_AUTH_WPA1WPA2_RADIUS}
);
export const encTypeOptions = new Array(
    {textIndex: 275, value: wlan_enc.WLAN_ENC_TKIP},
    {textIndex: 276, value: wlan_enc.WLAN_ENC_AES},
    {textIndex: 277, value: wlan_enc.WLAN_ENC_TKIPAES}
);
export const wdsModeOptions = new Array(
    {textIndex: 854, value: wlan_auth.WLAN_AUTH_WEP_OPEN},
    {textIndex: 855, value: wlan_auth.WLAN_AUTH_WPA_PSK},
    {textIndex: 856, value: wlan_auth.WLAN_AUTH_WPA_RADIUS}
);
export const wdsEncTypeOption = new Array(
    {textIndex: 854, value: wlan_enc.WLAN_ENC_NONE},
    {textIndex: 276, value: wlan_enc.WLAN_ENC_AES}
);
export const tsTypeOptions = new Array(
    {textIndex: 245,value: wlan_ts.WLAN_TS_DISABLED},
    {textIndex: 760,value: wlan_ts.WLAN_TS_BY_SSID}
);
export const atfTypeOptions = new Array(
    {textIndex: 414,value: wlan_atf_type.WLAN_ATF_TYPE_AUTO},
    {textIndex: 780,value: wlan_atf_type.WLAN_ATF_TYPE_STATIC},
    {textIndex: 245,value: wlan_atf_type.WLAN_ATF_TYPE_DISABLED}
);
export const aclModeOptions = new Array(
    {textIndex: 866,value: wlan_acl_type.WLAN_ACL_TYPE_WHITE},
    {textIndex: 867,value: wlan_acl_type.WLAN_ACL_TYPE_BLACK}
);
export const pskkeyTypeOptions = new Array(
    {textIndex: 281, value: pskkey_type.PSK_KEY_TYPE_PASSPHRASE},
    {textIndex: 257, value: pskkey_type.PSK_KEY_TYPE_HEX}
);
export const addAuthOptions = new Array(
    {textIndex: 284, value: add_auth.ADD_AUTH_NONE},
    {textIndex: 285, value: add_auth.ADD_AUTH_MAC_FILTER},
    {textIndex: 286, value: add_auth.ADD_AUTH_MAC_FILTER_RADIUS},
    {textIndex: 287, value: add_auth.ADD_AUTH_MAC_RADIUS}
);
export const lanTypeOptions = new Array(
    {textIndex: 292, value: lan_type.LAN_TYPE_STATIC},
    {textIndex: 293, value: lan_type.LAN_TYPE_DHCPCLIENT}
);
export const dnsTypeOptions = new Array(
    {textIndex: 298, value: dns_type.DNS_USER_DEFINE},
    {textIndex: 299, value: dns_type.DNS_FROM_DHCP}
);
export const guestPortalAuthOptions = new Array(
    {textIndex: 430, value: guestportal_type.GUESTPORTL_AUTH_TYPE_FREE}, // 0
    {textIndex: 431, value: guestportal_type.GUESTPORTL_AUTH_TYPE_SLA}, // 1
    {textIndex: 432, value: guestportal_type.GUESTPORTL_AUTH_TYPE_PASSCODE}, // 5
    {textIndex: 873, value: guestportal_type.GUESTPORTL_AUTH_TYPE_EXTERNAL} // 4
);
export const guestAccessTypeOptions = new Array(
    {textIndex: 245,value: guestaccess_type.GUESTACCESS_DISABLED},
//     {textIndex: 812,value: guestaccess_type.GUESTACCESS_DENYALL},
//     {textIndex: 813,value: guestaccess_type.GUESTACCESS_ALLOWALL},
    {textIndex: 814,value: guestaccess_type.GUESTACCESS_INTERNAL}
);
export const wirelessClientIsolationOptions = new Array(
    {textIndex: 245, value: 0},
    {textIndex: 471, value: 1},
    {textIndex: 472, value: 2}
);
export const logSeverityOptions = new Array(
    {textIndex: 524},
    {textIndex: 525},
    {textIndex: 524},
    {textIndex: 527},
    {textIndex: 526}
);
export const countryOptions = new Array(
    {textIndex: 528,    A2: 'AL',   A3: 'ALB',  num: 8},
    {textIndex: 529,    A2: 'DZ',   A3: 'DZA',  num: 12},
    {textIndex: 530,    A2: 'AR',   A3: 'ARG',  num: 32},
    {textIndex: 531,    A2: 'AM',   A3: 'ARM',  num: 51},
    {textIndex: 532,    A2: 'AU',   A3: 'AUS',  num: 35},
    {textIndex: 533,    A2: 'AT',   A3: 'AUT',  num: 40},
    {textIndex: 534,    A2: 'AZ',   A3: 'AZE',  num: 31},
    {textIndex: 535,    A2: 'BS',   A3: 'BHS',  num: 44},
    {textIndex: 536,    A2: 'BH',   A3: 'BHR',  num: 48},
    {textIndex: 537,    A2: 'BD',   A3: 'BGD',  num: 50},
    {textIndex: 538,    A2: 'BB',   A3: 'BRB',  num: 52},
    {textIndex: 539,    A2: 'BY',   A3: 'BLR',  num: 112},
    {textIndex: 540,    A2: 'BE',   A3: 'BEL',  num: 56},
    {textIndex: 541,    A2: 'BZ',   A3: 'BLZ',  num: 84},
    {textIndex: 542,    A2: 'BM',   A3: 'BMU',  num: 60},
    {textIndex: 543,    A2: 'BO',   A3: 'BOL',  num: 68},
    {textIndex: 544,    A2: 'BA',   A3: 'BIH',  num: 70},
    {textIndex: 545,    A2: 'BR',   A3: 'BRA',  num: 76},
    {textIndex: 546,    A2: 'BN',   A3: 'BRN',  num: 96},
    {textIndex: 547,    A2: 'BG',   A3: 'BGR',  num: 100},
    {textIndex: 548,    A2: 'KH',   A3: 'KHM',  num: 116},
    {textIndex: 549,    A2: 'CA',   A3: 'CAN',  num: 124},
    {textIndex: 550,    A2: 'CL',   A3: 'CHL',  num: 152},
    {textIndex: 551,    A2: 'CN',   A3: 'CHN',  num: 156},
    {textIndex: 552,    A2: 'CO',   A3: 'COL',  num: 170},
    {textIndex: 553,    A2: 'CR',   A3: 'CRI',  num: 188},
    {textIndex: 554,    A2: 'HR',   A3: 'HRV',  num: 191},
    {textIndex: 555,    A2: 'CY',   A3: 'CYP',  num: 196},
    {textIndex: 556,    A2: 'CZ',   A3: 'CZE',  num: 203},
    {textIndex: 557,    A2: 'DK',   A3: 'DNK',  num: 208},
    {textIndex: 558,    A2: 'DO',   A3: 'DOM',  num: 214},
    {textIndex: 559,    A2: 'EC',   A3: 'ECU',  num: 218},
    {textIndex: 560,    A2: 'EG',   A3: 'EGY',  num: 818},
    {textIndex: 561,    A2: 'SV',   A3: 'SLV',  num: 222},
    {textIndex: 562,    A2: 'EE',   A3: 'EST',  num: 233},
    {textIndex: 563,    A2: 'FO',   A3: 'FRO',  num: 234},
    {textIndex: 564,    A2: 'FI',   A3: 'FIN',  num: 246},
    {textIndex: 565,    A2: 'FR',   A3: 'FRA',  num: 250},
    {textIndex: 566,    A2: 'GF',   A3: 'GUF',  num: 254},
    {textIndex: 567,    A2: 'PF',   A3: 'PYF',  num: 258},
    {textIndex: 568,    A2: 'GE',   A3: 'GEO',  num: 268},
    {textIndex: 569,    A2: 'DE',   A3: 'DEU',  num: 276},
    {textIndex: 570,    A2: 'GR',   A3: 'GRC',  num: 300},
    {textIndex: 571,    A2: 'GL',   A3: 'GRL',  num: 304},
    {textIndex: 572,    A2: 'GD',   A3: 'GRD',  num: 308},
    {textIndex: 573,    A2: 'GP',   A3: 'GLP',  num: 312},
    {textIndex: 574,    A2: 'GU',   A3: 'GUM',  num: 316},
    {textIndex: 575,    A2: 'GT',   A3: 'GTM',  num: 320},
    {textIndex: 576,    A2: 'HT',   A3: 'HTI',  num: 332},
    {textIndex: 577,    A2: 'HN',   A3: 'HND',  num: 340},
    {textIndex: 578,    A2: 'HK',   A3: 'HKG',  num: 344},
    {textIndex: 579,    A2: 'HU',   A3: 'HUN',  num: 348},
    {textIndex: 580,    A2: 'IS',   A3: 'ISL',  num: 352},
    {textIndex: 581,    A2: 'IN',   A3: 'IND',  num: 356},
    {textIndex: 582,    A2: 'ID',   A3: 'IDN',  num: 360},
    {textIndex: 583,    A2: 'IR',   A3: 'IRN',  num: 364},
    {textIndex: 584,    A2: 'IQ',   A3: 'IRQ',  num: 368},
    {textIndex: 585,    A2: 'IE',   A3: 'IRL',  num: 372},
    {textIndex: 586,    A2: 'IL',   A3: 'ISR',  num: 376},
    {textIndex: 587,    A2: 'IT',   A3: 'ITA',  num: 380},
    {textIndex: 588,    A2: 'JM',   A3: 'JAM',  num: 388},
    {textIndex: 589,    A2: 'JP',   A3: 'JPN',  num: 392},
    {textIndex: 590,    A2: 'JO',   A3: 'JOR',  num: 400},
    {textIndex: 591,    A2: 'KZ',   A3: 'KAZ',  num: 398},
    {textIndex: 592,    A2: 'KE',   A3: 'KEN',  num: 404},
    {textIndex: 593,    A2: 'KP',   A3: 'PRK',  num: 408},
    {textIndex: 594,    A2: 'KR',   A3: 'KOR',  num: 410},
    {textIndex: 595,    A2: 'KW',   A3: 'KWT',  num: 414},
    {textIndex: 596,    A2: 'LV',   A3: 'LVA',  num: 428},
    {textIndex: 597,    A2: 'LB',   A3: 'LBN',  num: 422},
    {textIndex: 598,    A2: 'LY',   A3: 'LBY',  num: 434},
    {textIndex: 599,    A2: 'LI',   A3: 'LIE',  num: 438},
    {textIndex: 600,    A2: 'LT',   A3: 'LTU',  num: 440},
    {textIndex: 601,    A2: 'LU',   A3: 'LUX',  num: 442},
    {textIndex: 602,    A2: 'MO',   A3: 'MAC',  num: 446},
    {textIndex: 603,    A2: 'MK',   A3: 'MKD',  num: 807},
    {textIndex: 604,    A2: 'MW',   A3: 'MWI',  num: 454},
    {textIndex: 605,    A2: 'MY',   A3: 'MYS',  num: 458},
    {textIndex: 606,    A2: 'MV',   A3: 'MDV',  num: 462},
    {textIndex: 607,    A2: 'MT',   A3: 'MLT',  num: 470},
    {textIndex: 608,    A2: 'MQ',   A3: 'MTQ',  num: 474},
    {textIndex: 609,    A2: 'MU',   A3: 'MUS',  num: 480},
    {textIndex: 610,    A2: 'YT',   A3: 'MYT',  num: 175},
    {textIndex: 611,    A2: 'MX',   A3: 'MEX',  num: 484},
    {textIndex: 612,    A2: 'MC',   A3: 'MCO',  num: 492},
    {textIndex: 613,    A2: 'MA',   A3: 'MAR',  num: 504},
    {textIndex: 614,    A2: 'NP',   A3: 'NPL',  num: 524},
    {textIndex: 615,    A2: 'NL',   A3: 'NLD',  num: 528},
    {textIndex: 616,    A2: 'AN',   A3: 'ANT',  num: 530},
    {textIndex: 617,    A2: 'AW',   A3: 'ABW',  num: 533},
    {textIndex: 618,    A2: 'NZ',   A3: 'NZL',  num: 554},
    {textIndex: 619,    A2: 'NI',   A3: 'NIC',  num: 558},
    {textIndex: 620,    A2: 'NO',   A3: 'NOR',  num: 578},
    {textIndex: 621,    A2: 'OM',   A3: 'OMN',  num: 512},
    {textIndex: 622,    A2: 'PK',   A3: 'PAK',  num: 586},
    {textIndex: 623,    A2: 'PA',   A3: 'PAN',  num: 591},
    {textIndex: 624,    A2: 'PG',   A3: 'PNG',  num: 598},
    {textIndex: 625,    A2: 'PY',   A3: 'PRY',  num: 600},
    {textIndex: 626,    A2: 'PE',   A3: 'PER',  num: 604},
    {textIndex: 627,    A2: 'PH',   A3: 'PHL',  num: 608},
    {textIndex: 628,    A2: 'PL',   A3: 'POL',  num: 616},
    {textIndex: 629,    A2: 'PT',   A3: 'PRT',  num: 620},
    {textIndex: 630,    A2: 'PR',   A3: 'PRI',  num: 630},
    {textIndex: 631,    A2: 'QA',   A3: 'QAT',  num: 634},
    {textIndex: 632,    A2: 'RE',   A3: 'REU',  num: 638},
    {textIndex: 633,    A2: 'RO',   A3: 'ROU',  num: 642},
    {textIndex: 634,    A2: 'RU',   A3: 'RUS',  num: 643},
    {textIndex: 635,    A2: 'RW',   A3: 'RWA',  num: 646},
    {textIndex: 636,    A2: 'SA',   A3: 'SAU',  num: 682},
    {textIndex: 637,    A2: 'CS',   A3: 'SCG',  num: 891},
    {textIndex: 638,    A2: 'SG',   A3: 'SGP',  num: 702},
    {textIndex: 639,    A2: 'SK',   A3: 'SVK',  num: 703},
    {textIndex: 640,    A2: 'SI',   A3: 'SVN',  num: 705},
    {textIndex: 641,    A2: 'ZA',   A3: 'ZAF',  num: 710},
    {textIndex: 642,    A2: 'ES',   A3: 'ESP',  num: 724},
    {textIndex: 643,    A2: 'LK',   A3: 'LKA',  num: 144},
    {textIndex: 644,    A2: 'SE',   A3: 'SWE',  num: 752},
    {textIndex: 645,    A2: 'CH',   A3: 'CHE',  num: 756},
    {textIndex: 646,    A2: 'SY',   A3: 'SYR',  num: 760},
    {textIndex: 647,    A2: 'TW',   A3: 'TWN',  num: 158},
    {textIndex: 648,    A2: 'TZ',   A3: 'TZA',  num: 834},
    {textIndex: 649,    A2: 'TH',   A3: 'THA',  num: 764},
    {textIndex: 650,    A2: 'TT',   A3: 'TTO',  num: 780},
    {textIndex: 651,    A2: 'TN',   A3: 'TUN',  num: 788},
    {textIndex: 652,    A2: 'TR',   A3: 'TUR',  num: 792},
    {textIndex: 653,    A2: 'AE',   A3: 'ARE',  num: 784},
    {textIndex: 654,    A2: 'UG',   A3: 'UGA',  num: 800},
    {textIndex: 655,    A2: 'UA',   A3: 'UKR',  num: 804},
    {textIndex: 656,    A2: 'GB',   A3: 'GBR',  num: 826},
    {textIndex: 657,    A2: 'US',   A3: 'USA',  num: 840},
    {textIndex: 658,    A2: 'UY',   A3: 'URY',  num: 858},
    {textIndex: 659,    A2: 'UZ',   A3: 'UZB',  num: 860},
    {textIndex: 660,    A2: 'VE',   A3: 'VEN',  num: 862},
    {textIndex: 661,    A2: 'VN',   A3: 'VNM',  num: 704},
    {textIndex: 662,    A2: 'YE',   A3: 'YEM',  num: 887},
    {textIndex: 663,    A2: 'ZW',   A3: 'ZWE',  num: 716}
);
export const tzOptions = new Array(
    {textIndex: 664, gmt: 'GMT-12:00',   timediff: -12,  value: 0},
    {textIndex: 665, gmt: 'GMT-11:00',   timediff: -11,  value: 1},
    {textIndex: 666, gmt: 'GMT-10:00',   timediff: -10,  value: 2},
    {textIndex: 667, gmt: 'GMT-09:00',   timediff: -9,   value: 3},
    {textIndex: 668, gmt: 'GMT-08:00',   timediff: -8,   value: 4},
    {textIndex: 669, gmt: 'GMT-07:00',   timediff: -7,   value: 5},
    {textIndex: 670, gmt: 'GMT-07:00',   timediff: -7,   value: 6},
    {textIndex: 671, gmt: 'GMT-07:00',   timediff: -7,   value: 7},
    {textIndex: 672, gmt: 'GMT-06:00',   timediff: -6,   value: 8},
    {textIndex: 673, gmt: 'GMT-06:00',   timediff: -6,   value: 9},
    {textIndex: 674, gmt: 'GMT-06:00',   timediff: -6,   value: 10},
    {textIndex: 675, gmt: 'GMT-06:00',   timediff: -6,   value: 11},
    {textIndex: 676, gmt: 'GMT-05:00',   timediff: -5,   value: 12},
    {textIndex: 677, gmt: 'GMT-05:00',   timediff: -5,   value: 13},
    {textIndex: 678, gmt: 'GMT-05:00',   timediff: -5,   value: 14},
    {textIndex: 679, gmt: 'GMT-04:00',   timediff: -4,   value: 15},
    {textIndex: 680, gmt: 'GMT-04:00',   timediff: -4,   value: 16},
    {textIndex: 681, gmt: 'GMT-04:00',   timediff: -4,   value: 17},
    {textIndex: 682, gmt: 'GMT-03:30',   timediff: -3.5, value: 18},
    {textIndex: 683, gmt: 'GMT-03:00',   timediff: -3,   value: 19},
    {textIndex: 684, gmt: 'GMT-03:00',   timediff: -3,   value: 20},
    {textIndex: 685, gmt: 'GMT-03:00',   timediff: -3,   value: 21},
    {textIndex: 686, gmt: 'GMT-02:00',   timediff: -2,   value: 22},
    {textIndex: 687, gmt: 'GMT-01:00',   timediff: -1,   value: 23},
    {textIndex: 688, gmt: 'GMT-01:00',   timediff: -1,   value: 24},
    {textIndex: 689, gmt: 'GMT+00:00',   timediff: 0,    value: 25},
    {textIndex: 690, gmt: 'GMT+00:00',   timediff: 0,    value: 26},
    {textIndex: 691, gmt: 'GMT+01:00',   timediff: 1,    value: 27},
    {textIndex: 692, gmt: 'GMT+01:00',   timediff: 1,    value: 28},
    {textIndex: 693, gmt: 'GMT+01:00',   timediff: 1,    value: 29},
    {textIndex: 694, gmt: 'GMT+01:00',   timediff: 1,    value: 30},
    {textIndex: 695, gmt: 'GMT+01:00',   timediff: 1,    value: 31},
    {textIndex: 696, gmt: 'GMT+02:00',   timediff: 2,    value: 32},
    {textIndex: 697, gmt: 'GMT+02:00',   timediff: 2,    value: 33},
    {textIndex: 698, gmt: 'GMT+02:00',   timediff: 2,    value: 34},
    {textIndex: 699, gmt: 'GMT+02:00',   timediff: 2,    value: 35},
    {textIndex: 700, gmt: 'GMT+02:00',   timediff: 2,    value: 36},
    {textIndex: 701, gmt: 'GMT+02:00',   timediff: 2,    value: 37},
    {textIndex: 702, gmt: 'GMT+03:00',   timediff: 3,    value: 38},
    {textIndex: 703, gmt: 'GMT+03:00',   timediff: 3,    value: 39},
    {textIndex: 704, gmt: 'GMT+03:00',   timediff: 3,    value: 40},
    {textIndex: 705, gmt: 'GMT+03:00',   timediff: 3,    value: 41},
    {textIndex: 706, gmt: 'GMT+03:30',   timediff: 3.5,  value: 42},
    {textIndex: 707, gmt: 'GMT+04:00',   timediff: 4,    value: 43},
    {textIndex: 708, gmt: 'GMT+04:00',   timediff: 4,    value: 44},
    {textIndex: 709, gmt: 'GMT+04:30',   timediff: 4.5,  value: 45},
    {textIndex: 710, gmt: 'GMT+05:00',   timediff: 5,    value: 46},
    {textIndex: 711, gmt: 'GMT+05:00',   timediff: 5,    value: 47},
    {textIndex: 712, gmt: 'GMT+05:30',   timediff: 5.5,  value: 48},
    {textIndex: 713, gmt: 'GMT+05:45',   timediff: 5.75, value: 49},
    {textIndex: 714, gmt: 'GMT+06:00',   timediff: 6,    value: 50},
    {textIndex: 715, gmt: 'GMT+06:00',   timediff: 6,    value: 51},
    {textIndex: 716, gmt: 'GMT+06:00',   timediff: 6,    value: 52},
    {textIndex: 717, gmt: 'GMT+06:30',   timediff: 6.5,  value: 53},
    {textIndex: 718, gmt: 'GMT+07:00',   timediff: 7,    value: 54},
    {textIndex: 719, gmt: 'GMT+07:00',   timediff: 7,    value: 55},
    {textIndex: 720, gmt: 'GMT+08:00',   timediff: 8,    value: 56},
    {textIndex: 721, gmt: 'GMT+08:00',   timediff: 8,    value: 57},
    {textIndex: 722, gmt: 'GMT+08:00',   timediff: 8,    value: 58},
    {textIndex: 723, gmt: 'GMT+08:00',   timediff: 8,    value: 59},
    {textIndex: 724, gmt: 'GMT+08:00',   timediff: 8,    value: 60},
    {textIndex: 725, gmt: 'GMT+09:00',   timediff: 9,    value: 61},
    {textIndex: 726, gmt: 'GMT+09:00',   timediff: 9,    value: 62},
    {textIndex: 727, gmt: 'GMT+09:00',   timediff: 9,    value: 63},
    {textIndex: 728, gmt: 'GMT+09:30',   timediff: 9.5,  value: 64},
    {textIndex: 729, gmt: 'GMT+09:30',   timediff: 9.5,  value: 65},
    {textIndex: 730, gmt: 'GMT+10:00',   timediff: 10,   value: 66},
    {textIndex: 731, gmt: 'GMT+10:00',   timediff: 10,   value: 67},
    {textIndex: 732, gmt: 'GMT+10:00',   timediff: 10,   value: 68},
    {textIndex: 733, gmt: 'GMT+10:00',   timediff: 10,   value: 69},
    {textIndex: 734, gmt: 'GMT+10:00',   timediff: 10,   value: 70},
    {textIndex: 735, gmt: 'GMT+11:00',   timediff: 11,   value: 71},
    {textIndex: 736, gmt: 'GMT+12:00',   timediff: 12,   value: 72},
    {textIndex: 737, gmt: 'GMT+12:00',   timediff: 12,   value: 73}
);

export const languageOptions = new Array(
    {desc: 'Global (English)',          value: 'uk'},
//     {desc: 'Arabia (العربية)',          value: 'ar'},
    {desc: 'Czech (čeština)',           value: 'cs'},
    {desc: 'Germany (Deutsch)',         value: 'de'},
    {desc: 'Spain (Español)',           value: 'es'},
    {desc: 'France (Français)',         value: 'fr'},
//     {desc: 'Indonesia (Indonesia)',     value: 'id'},
    {desc: 'Italy (Italiano)',          value: 'it'},
//     {desc: 'Japan (日本語)',             value: 'jp'},
    {desc: 'Nederland (Nederlands)',    value: 'nl'},
    {desc: 'Poland (Polski)',           value: 'pl'},
    {desc: 'Portugal (Português)',      value: 'pt'},
    {desc: 'Romania (Romana)',          value: 'ro'},
    {desc: 'Russian (Россия)',          value: 'ru'},
    {desc: 'Slovakia (Slovenský)',      value: 'sk'},
    {desc: 'Turkey (Türkçe)',           value: 'tr'},
//     {desc: 'Vietnam (Việt)',            value: 'vn'},
    {desc: 'China (簡體中文)',           value: 'zh_cn'},
    {desc: 'Taiwan (繁體中文)',          value: 'zh_tw'},
);
export const authTbl = new Array (
    {desc: 'OPEN'},
    {desc: 'AUTO'},
    {desc: 'SHARED'},
    {desc: 'WPA-PSK'},
    {desc: 'WPA-EAP'},
    {desc: 'WPA2-PSK'},
    {desc: 'WPA2-EAP'},
    {desc: 'WPA1-EAP / WPA2-EAP'},
    {desc: 'WPA1-PSK / WPA2-PSK'},
    {desc: 'WPA_NONE'}
);
export const encTbl = new Array (
    {desc: 'NONE'},
    {desc: 'WEP'},
    {desc: 'TKIP'},
    {desc: 'AES'},
    {desc: 'TKIP / AES'}
);
export const channel24gOptions_11 = new Array(
    {desc:'Ch 1, 2412MHz',  value:1},
    {desc:'Ch 2, 2417MHz',  value:2},
    {desc:'Ch 3, 2422MHz',  value:3},
    {desc:'Ch 4, 2427MHz',  value:4},
    {desc:'Ch 5, 2432MHz',  value:5},
    {desc:'Ch 6, 2437MHz',  value:6},
    {desc:'Ch 7, 2442MHz',  value:7},
    {desc:'Ch 8, 2447MHz',  value:8},
    {desc:'Ch 9. 2452MHz',  value:9},
    {desc:'Ch 10, 2457MHz', value:10},
    {desc:'Ch 11, 2462MHz', value:11}
);
export const channel24gOptions_13 = new Array(
    {desc:'Ch 1, 2412MHz',  value:1},
    {desc:'Ch 2, 2417MHz',  value:2},
    {desc:'Ch 3, 2422MHz',  value:3},
    {desc:'Ch 4, 2427MHz',  value:4},
    {desc:'Ch 5, 2432MHz',  value:5},
    {desc:'Ch 6, 2437MHz',  value:6},
    {desc:'Ch 7, 2442MHz',  value:7},
    {desc:'Ch 8, 2447MHz',  value:8},
    {desc:'Ch 9. 2452MHz',  value:9},
    {desc:'Ch 10, 2457MHz', value:10},
    {desc:'Ch 11, 2462MHz', value:11},
    {desc:'Ch 12, 2467MHz', value:12},
    {desc:'Ch 13, 2472MHz', value:13},
);
export const channel5gOptions_w52 = new Array(
    {desc:'Ch 36, 5.18GHz', value:36},
    {desc:'Ch 40, 5.20GHz', value:40},
    {desc:'Ch 44, 5.22GHz', value:44},
    {desc:'Ch 48, 5.24GHz', value:48}
);
export const channel5gOptions_w53= new Array(
    {desc:'Ch 52, 5.26GHz (DFS)',   value:52},
    {desc:'Ch 56, 5.28GHz (DFS)',   value:56},
    {desc:'Ch 60, 5.30GHz (DFS)',   value:60},
    {desc:'Ch 64, 5.32GHz (DFS)',   value:64}
);
export const channel5gOptions_w56= new Array(
    {desc:'Ch 100, 5.50GHz (DFS)',  value:100},
    {desc:'Ch 104, 5.52GHz (DFS)',  value:104},
    {desc:'Ch 108, 5.54GHz (DFS)',  value:108},
    {desc:'Ch 112, 5.56GHz (DFS)',  value:112},
    {desc:'Ch 116, 5.58GHz (DFS)',  value:116},
    {desc:'Ch 120, 5.60GHz (DFS)',  value:120},
    {desc:'Ch 124, 5.62GHz (DFS)',  value:124},
    {desc:'Ch 128, 5.64GHz (DFS)',  value:128},
    {desc:'Ch 132, 5.66GHz (DFS)',  value:132},
    {desc:'Ch 136, 5.68GHz (DFS)',  value:136},
    {desc:'Ch 140, 5.70GHz (DFS)',  value:140}
);
export const channel5gOptions_w58= new Array(
    {desc:'Ch 149, 5.745GHz',   value:149},
    {desc:'Ch 153, 5.765GHz',   value:153},
    {desc:'Ch 157, 5.785GHz',   value:157},
    {desc:'Ch 161, 5.805GHz',   value:161},
    {desc:'Ch 165, 5.825GHz',   value:165}
);
export const band24gOptions = new Array(
    {desc:'11b',        value:18},
    {desc:'11g',        value:34},
    {desc:'11b/g',      value:50},
    {desc:'11g/n',      value:98},
    {desc:'11b/g/n',   value:114}
);
export const band5gOptions = new Array(
    {desc:'11a',        value:12},
    {desc:'11a/n',      value:76},
    {desc:'11a/n/ac',   value:204}
);
export const txPowerOptions = new Array(
    {desc:'100%',   value:100},
    {desc:'90%',    value:90},
    {desc:'75%',    value:75},
    {desc:'50%',    value:50},
    {desc:'25%',    value:25},
    {desc:'10%',    value:10}
);
export const coverageColorMap = new Array(
    '#FFFFFF', '#E6FFFF', '#C4FFFF', '#95FFFF', '#59FFFF', '#1AFFFF', '#1AFFD2', '#1AFFB5', '#1AFF86', '#1AFF62',
    '#23FF1A', '#6BFF1A', '#98FF1A', '#CEFF1A', '#E9FF1A', '#FDF81C', '#FBEA1E', '#F6CE23', '#FBBC2C', '#FFAE3E'
);
export const unitOptions = new Array(
    {unit: 'cm',    metConverse: 1,         impConverse: 0.3937},
    {unit: 'inch',  metConverse: 2.54,      impConverse: 1},
    {unit: 'ft',    metConverse: 30.4801,   impConverse: 12},
    {unit: 'yard',  metConverse: 91.4402,   impConverse: 36},
    {unit: 'm',     metConverse: 100,       impConverse: 39.37}
);
export const portalTypeOptions = new Array(
    {desc: 'http://',  value: guestportal_port.GUESTPORTL_TYPE_HTTP},
    {desc: 'https://', value: guestportal_port.GUESTPORTL_TYPE_HTTPS}
);
export const logLevelOptions = new Array( // hidden page used (no multiple-language)
    {desc: 'Notice',    value: 0},
    {desc: 'Warning',   value: 1},
    {desc: 'Error',     value: 2},
    {desc: 'Debug',     value: 3}
);
export const DeviceNum = new Array(
    {textIndex: 877},
    {textIndex: 878},
    {textIndex: 879},
    {textIndex: 880},
    {textIndex: 881}
);
