"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Code } from "@/components/ui/syntaxHighlighter";
import { Textarea } from "@/components/ui/textarea";
import * as cheerio from "cheerio";
import { head, omit } from "lodash-es";
import { useEffect, useState } from "react";

const defaultA = `<table class="wikitable sortable jquery-tablesorter" style="margin:1em auto;">
<caption>Million-selling game consoles
</caption>
<thead><tr>
<th scope="col" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Platform
</th>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Type
</th>
<th scope="col" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Firm
</th>
<th scope="col" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Released<sup class="reference" id="ref_Release_sources2"><a href="#endnote_Release_sources2">[2]</a></sup>
</th>
<th scope="col" data-sort-type="number" class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Units sold
</th>
<th scope="col" class="unsortable"><abbr title="Reference(s)">Ref.</abbr>
</th></tr></thead><tbody>
<tr>
<td><a href="/wiki/PlayStation_2" title="PlayStation 2">PlayStation 2</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Sony" title="Sony">Sony</a>
</td>
<td style="text-align:center;">2000
</td>
<td style="text-align:right;" data-sort-value="155.1"><sup class="reference plainlinks nourlexpansion" id="ref_Greater"><a href="#endnote_Greater">&gt;</a></sup>155&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-PlayStation_family_30-0" class="reference"><a href="#cite_note-PlayStation_family-30">[note 1]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Nintendo_DS" title="Nintendo DS">Nintendo DS</a>
</td>
<td>Handheld
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">2004
</td>
<td style="text-align:right;">154.02&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-nintendo-ir_31-0" class="reference"><a href="#cite_note-nintendo-ir-31">[30]</a></sup>
</td></tr>
<tr>
<td style="background:#b6fcb6;"><a href="/wiki/Nintendo_Switch" title="Nintendo Switch">Nintendo Switch</a> #
</td>
<td>Hybrid
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">2017
</td>
<td style="text-align:right">139.36 million
</td>
<td style="text-align:center;"><sup id="cite_ref-nintendo-ir_31-1" class="reference"><a href="#cite_note-nintendo-ir-31">[30]</a></sup><sup id="cite_ref-32" class="reference"><a href="#cite_note-32">[note 2]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Game_Boy" title="Game Boy">Game Boy</a> &amp; <a href="/wiki/Game_Boy_Color" title="Game Boy Color">Game Boy Color</a>
</td>
<td>Handheld
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">1989, 1998
</td>
<td style="text-align:right;">118.69&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-nintendo-ir_31-2" class="reference"><a href="#cite_note-nintendo-ir-31">[30]</a></sup><sup id="cite_ref-GB_and_GBC_35-0" class="reference"><a href="#cite_note-GB_and_GBC-35">[note 3]</a></sup>
</td></tr>
<tr>
<td style="background:#b6fcb6;"><a href="/wiki/PlayStation_4" title="PlayStation 4">PlayStation 4</a> #
</td>
<td>Home
</td>
<td><a href="/wiki/Sony" title="Sony">Sony</a>
</td>
<td style="text-align:center;">2013
</td>
<td style="text-align:right">117.2&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-36" class="reference"><a href="#cite_note-36">[33]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/PlayStation_(console)" title="PlayStation (console)">PlayStation</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Sony" title="Sony">Sony</a>
</td>
<td style="text-align:center;">1994
</td>
<td style="text-align:right;">102.49&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-ps1_37-0" class="reference"><a href="#cite_note-ps1-37">[34]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Wii" title="Wii">Wii</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">2006
</td>
<td style="text-align:right;">101.63&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-nintendo-ir_31-3" class="reference"><a href="#cite_note-nintendo-ir-31">[30]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/PlayStation_3" title="PlayStation 3">PlayStation 3</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Sony" title="Sony">Sony</a>
</td>
<td style="text-align:center;">2006
</td>
<td style="text-align:right" data-sort-value="87.4"><sup class="reference plainlinks nourlexpansion" id="ref_Greater"><a href="#endnote_Greater">&gt;</a></sup>87.4&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-PlayStation_family_30-1" class="reference"><a href="#cite_note-PlayStation_family-30">[note 1]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Xbox_360" title="Xbox 360">Xbox 360</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Microsoft" title="Microsoft">Microsoft</a>
</td>
<td style="text-align:center;">2005
</td>
<td style="text-align:right;"><sup class="reference plainlinks nourlexpansion" id="ref_Greater"><a href="#endnote_Greater">&gt;</a></sup>84&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-xbox_efn_45-0" class="reference"><a href="#cite_note-xbox_efn-45">[note 4]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Game_Boy_Advance" title="Game Boy Advance">Game Boy Advance</a>
</td>
<td>Handheld
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">2001
</td>
<td style="text-align:right;">81.51&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-nintendo-ir_31-4" class="reference"><a href="#cite_note-nintendo-ir-31">[30]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/PlayStation_Portable" title="PlayStation Portable">PlayStation Portable</a>
</td>
<td>Handheld
</td>
<td><a href="/wiki/Sony" title="Sony">Sony</a>
</td>
<td style="text-align:center;">2004
</td>
<td style="text-align:right;" data-sort-value="81">80–82&nbsp;million <small>(estimate)</small>
</td>
<td style="text-align:center;"><sup id="cite_ref-PlayStation_family_30-2" class="reference"><a href="#cite_note-PlayStation_family-30">[note 1]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Nintendo_3DS" title="Nintendo 3DS">Nintendo 3DS</a>
</td>
<td>Handheld
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">2011
</td>
<td style="text-align:right;">75.94&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-nintendo-ir_31-5" class="reference"><a href="#cite_note-nintendo-ir-31">[30]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Nintendo_Entertainment_System" title="Nintendo Entertainment System">NES/Famicom</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">1983
</td>
<td style="text-align:right;">61.91&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-nintendo-ir_31-6" class="reference"><a href="#cite_note-nintendo-ir-31">[30]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Xbox_One" title="Xbox One">Xbox One</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Microsoft" title="Microsoft">Microsoft</a>
</td>
<td style="text-align:center;">2013
</td>
<td style="text-align:right;" data-sort-value="54.75">~58&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-Xbox_sales_46-0" class="reference"><a href="#cite_note-Xbox_sales-46">[42]</a></sup>
</td></tr>
<tr>
<td style="background:#b6fcb6;"><a href="/wiki/PlayStation_5" title="PlayStation 5">PlayStation 5</a> #
</td>
<td>Home
</td>
<td><a href="/wiki/Sony" title="Sony">Sony</a>
</td>
<td style="text-align:center;">2020
</td>
<td style="text-align:right">50 million
</td>
<td style="text-align:center;"><sup id="cite_ref-47" class="reference"><a href="#cite_note-47">[43]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Super_Nintendo_Entertainment_System" title="Super Nintendo Entertainment System">SNES/Super Famicom</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">1990
</td>
<td style="text-align:right;">49.1&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-nintendo-ir_31-7" class="reference"><a href="#cite_note-nintendo-ir-31">[30]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Game_%26_Watch" title="Game &amp; Watch">Game &amp; Watch</a>
</td>
<td>Dedicated handheld
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">1980
</td>
<td style="text-align:right">43.4&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-Game&amp;Watch_48-0" class="reference"><a href="#cite_note-Game&amp;Watch-48">[44]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Nintendo_64" title="Nintendo 64">Nintendo 64</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">1996
</td>
<td style="text-align:right;">32.93&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-nintendo-ir_31-8" class="reference"><a href="#cite_note-nintendo-ir-31">[30]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Sega_Genesis/Mega_Drive" class="mw-redirect" title="Sega Genesis/Mega Drive">Sega Genesis/Mega Drive</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Sega" title="Sega">Sega</a>
</td>
<td style="text-align:center;">1988
</td>
<td style="text-align:right;">30.75&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-genesis_52-0" class="reference"><a href="#cite_note-genesis-52">[note 5]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Atari_2600" title="Atari 2600">Atari 2600</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Atari" title="Atari">Atari</a>
</td>
<td style="text-align:center;">1977
</td>
<td style="text-align:right">30&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-atari2600_PR_53-0" class="reference"><a href="#cite_note-atari2600_PR-53">[48]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Xbox_(console)" title="Xbox (console)">Xbox</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Microsoft" title="Microsoft">Microsoft</a>
</td>
<td style="text-align:center;">2001
</td>
<td style="text-align:right;">24&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-xbox_54-0" class="reference"><a href="#cite_note-xbox-54">[49]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/GameCube" title="GameCube">GameCube</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">2001
</td>
<td style="text-align:right;">21.74&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-nintendo-ir_31-9" class="reference"><a href="#cite_note-nintendo-ir-31">[30]</a></sup>
</td></tr>
<tr>
<td style="background:#b6fcb6;"><a href="/wiki/Xbox_Series_X_and_Series_S" title="Xbox Series X and Series S">Xbox Series X/S</a> #
</td>
<td>Home
</td>
<td><a href="/wiki/Microsoft" title="Microsoft">Microsoft</a>
</td>
<td style="text-align:center;">2020
</td>
<td style="text-align:right" data-sort-value="21.0">~21 million
</td>
<td style="text-align:center;"><sup id="cite_ref-55" class="reference"><a href="#cite_note-55">[50]</a></sup>
</td></tr>
<tr>
<td style="background:#b6fcb6;"><a href="/wiki/Quest_2" title="Quest 2">Quest 2</a> #
</td>
<td><a href="/wiki/Virtual_reality_headset" title="Virtual reality headset">VR headset</a>
</td>
<td><a href="/wiki/Reality_Labs" title="Reality Labs">Reality Labs</a> / <a href="/wiki/Meta_Platforms" title="Meta Platforms">Meta</a>
</td>
<td style="text-align:center;">2020
</td>
<td style="text-align:right" data-sort-value="20.0">~20 million
</td>
<td style="text-align:center;"><sup id="cite_ref-56" class="reference"><a href="#cite_note-56">[51]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Wii_U" title="Wii U">Wii U</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">2012
</td>
<td style="text-align:right">13.56&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-nintendo-ir_31-10" class="reference"><a href="#cite_note-nintendo-ir-31">[30]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/V.Smile" title="V.Smile">V.Smile</a> &amp; <a href="/wiki/V.Smile#V.Motion_and_V.Smile_Motion" title="V.Smile">V.Motion</a>
</td>
<td>Home
</td>
<td><a href="/wiki/VTech" title="VTech">VTech</a>
</td>
<td style="text-align:center;">2004, 2007
</td>
<td style="text-align:right;">11&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-57" class="reference"><a href="#cite_note-57">[52]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/PlayStation_Vita" title="PlayStation Vita">PlayStation Vita</a>
</td>
<td>Handheld
</td>
<td><a href="/wiki/Sony" title="Sony">Sony</a>
</td>
<td style="text-align:center;">2011
</td>
<td style="text-align:right" data-sort-value="12.5">10–15&nbsp;million <small>(estimate)</small>
</td>
<td style="text-align:center;"><sup id="cite_ref-PlayStation_family_30-3" class="reference"><a href="#cite_note-PlayStation_family-30">[note 1]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Master_System" title="Master System">Master System</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Sega" title="Sega">Sega</a>
</td>
<td style="text-align:center;">1986
</td>
<td style="text-align:right;" data-sort-value="11.5">10–13&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-master_63-0" class="reference"><a href="#cite_note-master-63">[note 6]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Game_Gear" title="Game Gear">Game Gear</a>
</td>
<td>Handheld
</td>
<td><a href="/wiki/Sega" title="Sega">Sega</a>
</td>
<td style="text-align:center;">1990
</td>
<td style="text-align:right;">10.62&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-famitsu_306_49-1" class="reference"><a href="#cite_note-famitsu_306-49">[45]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/PC_Engine/TurboGrafx-16" class="mw-redirect" title="PC Engine/TurboGrafx-16">PC Engine/TurboGrafx-16</a>
</td>
<td>Home
</td>
<td><a href="/wiki/NEC" title="NEC">NEC</a>/<a href="/wiki/Hudson_Soft" title="Hudson Soft">Hudson Soft</a><sup id="cite_ref-Turbo_firm_65-0" class="reference"><a href="#cite_note-Turbo_firm-65">[note 7]</a></sup>
</td>
<td style="text-align:center;">1987
</td>
<td style="text-align:right">10&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-turbo_eurogamer_66-0" class="reference"><a href="#cite_note-turbo_eurogamer-66">[59]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Sega_Saturn" title="Sega Saturn">Sega Saturn</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Sega" title="Sega">Sega</a>
</td>
<td style="text-align:center;">1994
</td>
<td style="text-align:right">9.26&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-Sega_Stats_50-1" class="reference"><a href="#cite_note-Sega_Stats-50">[46]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Dreamcast" title="Dreamcast">Dreamcast</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Sega" title="Sega">Sega</a>
</td>
<td style="text-align:center;">1998
</td>
<td style="text-align:right">9.13&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-Sega_Stats_50-2" class="reference"><a href="#cite_note-Sega_Stats-50">[46]</a></sup><sup id="cite_ref-sega_Q4_FY2001_67-0" class="reference"><a href="#cite_note-sega_Q4_FY2001-67">[60]</a></sup><sup id="cite_ref-sega_Q4_FY2001_rev_68-0" class="reference"><a href="#cite_note-sega_Q4_FY2001_rev-68">[61]</a></sup><sup id="cite_ref-sega_Q4_FY2002_69-0" class="reference"><a href="#cite_note-sega_Q4_FY2002-69">[62]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Master_System" title="Master System">Master System</a> (Brazilian variants)
</td>
<td>Home
</td>
<td><a href="/wiki/Tectoy" title="Tectoy">Tectoy</a>
</td>
<td style="text-align:center;">1989
</td>
<td style="text-align:right;" data-sort-value="8">8&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-MDB_70-0" class="reference"><a href="#cite_note-MDB-70">[63]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Dendy_(console)" title="Dendy (console)">Dendy</a> (<a href="/wiki/Famiclone" title="Famiclone">famiclone</a>)
</td>
<td>Home
</td>
<td><a href="/wiki/Micro_Genius" title="Micro Genius">Micro Genius</a>
</td>
<td style="text-align:center;">1992
</td>
<td style="text-align:right">6&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-71" class="reference"><a href="#cite_note-71">[64]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Super_NES_Classic_Edition" title="Super NES Classic Edition">Super NES Classic Edition</a>
</td>
<td>Dedicated
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">2017
</td>
<td style="text-align:right">5.28&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-SNESClassic_72-0" class="reference"><a href="#cite_note-SNESClassic-72">[65]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Famicom_Disk_System" title="Famicom Disk System">Famicom Disk System</a>
</td>
<td>Home console add-on
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">1986
</td>
<td style="text-align:right">4.5&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-NLife_73-0" class="reference"><a href="#cite_note-NLife-73">[66]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Advanced_Pico_Beena" class="mw-redirect" title="Advanced Pico Beena">Advanced Pico Beena</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Sega" title="Sega">Sega</a>
</td>
<td style="text-align:center;">2005
</td>
<td style="text-align:right"><sup class="reference plainlinks nourlexpansion" id="ref_Greater"><a href="#endnote_Greater">&gt;</a></sup>4.1&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-BeenaLite_74-0" class="reference"><a href="#cite_note-BeenaLite-74">[67]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/NES_Classic_Edition" title="NES Classic Edition">NES Classic Edition</a>
</td>
<td>Dedicated
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">2016
</td>
<td style="text-align:right">3.56&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-NESClassic_75-0" class="reference"><a href="#cite_note-NESClassic-75">[68]</a></sup><sup id="cite_ref-76" class="reference"><a href="#cite_note-76">[69]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/WonderSwan" title="WonderSwan">WonderSwan</a> &amp; <a href="/wiki/WonderSwan_Color" class="mw-redirect" title="WonderSwan Color">WonderSwan Color</a>
</td>
<td>Handheld
</td>
<td><a href="/wiki/Bandai" title="Bandai">Bandai</a>
</td>
<td style="text-align:center;">1999, 2000
</td>
<td style="text-align:right">3.5&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-bandai_82-0" class="reference"><a href="#cite_note-bandai-82">[note 8]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Sega_Pico" title="Sega Pico">Sega Pico</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Sega" title="Sega">Sega</a>
</td>
<td style="text-align:center;">1993
</td>
<td style="text-align:right" data-sort-value="3.41"><sup class="reference plainlinks nourlexpansion" id="ref_Greater"><a href="#endnote_Greater">&gt;</a></sup>3.4&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-Pico_86-0" class="reference"><a href="#cite_note-Pico-86">[note 9]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Color_TV-Game" title="Color TV-Game">Color TV-Game</a>
</td>
<td>Dedicated
</td>
<td><a href="/wiki/Nintendo" title="Nintendo">Nintendo</a>
</td>
<td style="text-align:center;">1977
</td>
<td style="text-align:right;">3&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-usgamer_dedicate_87-0" class="reference"><a href="#cite_note-usgamer_dedicate-87">[78]</a></sup><sup id="cite_ref-sheff_27_88-0" class="reference"><a href="#cite_note-sheff_27-88">[79]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Intellivision" title="Intellivision">Intellivision</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Mattel" title="Mattel">Mattel</a>
</td>
<td style="text-align:center;">1980
</td>
<td style="text-align:right">3&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-intellivision2_89-0" class="reference"><a href="#cite_note-intellivision2-89">[80]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Mega_Drive" class="mw-redirect" title="Mega Drive">Mega Drive</a> (Brazilian variants)
</td>
<td>Home
</td>
<td><a href="/wiki/Tectoy" title="Tectoy">Tectoy</a>
</td>
<td style="text-align:center;">1990
</td>
<td style="text-align:right;" data-sort-value="3">3&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-90" class="reference"><a href="#cite_note-90">[81]</a></sup><sup id="cite_ref-91" class="reference"><a href="#cite_note-91">[82]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/N-Gage_(device)" title="N-Gage (device)">N-Gage</a>
</td>
<td>Handheld
</td>
<td><a href="/wiki/Nokia" title="Nokia">Nokia</a>
</td>
<td style="text-align:center;">2003
</td>
<td style="text-align:right">3&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-N-Gage_92-0" class="reference"><a href="#cite_note-N-Gage-92">[83]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Sega_CD" title="Sega CD">Mega-CD/Sega CD</a>
</td>
<td>Home console add-on
</td>
<td><a href="/wiki/Sega" title="Sega">Sega</a>
</td>
<td style="text-align:center;">1991
</td>
<td style="text-align:right">2.24&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-famitsu_306_49-2" class="reference"><a href="#cite_note-famitsu_306-49">[45]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/ColecoVision" title="ColecoVision">ColecoVision</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Coleco" title="Coleco">Coleco</a>
</td>
<td style="text-align:center;">1982
</td>
<td style="text-align:right" data-sort-value="2.01"><sup class="reference plainlinks nourlexpansion" id="ref_Greater"><a href="#endnote_Greater">&gt;</a></sup>2&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-Coleco_96-0" class="reference"><a href="#cite_note-Coleco-96">[note 10]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/3DO_Interactive_Multiplayer" title="3DO Interactive Multiplayer">3DO Interactive Multiplayer</a>
</td>
<td>Home
</td>
<td><a href="/wiki/The_3DO_Company" title="The 3DO Company">The 3DO Company</a>
</td>
<td style="text-align:center;">1993
</td>
<td style="text-align:right" data-sort-value="2.01"><sup class="reference plainlinks nourlexpansion" id="ref_Greater"><a href="#endnote_Greater">&gt;</a></sup>2&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-gamepro-home_97-0" class="reference"><a href="#cite_note-gamepro-home-97">[87]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Neo_Geo_Pocket" title="Neo Geo Pocket">Neo Geo Pocket</a> &amp; <a href="/wiki/Neo_Geo_Pocket_Color" title="Neo Geo Pocket Color">Neo Geo Pocket Color</a>
</td>
<td>Handheld
</td>
<td><a href="/wiki/SNK" title="SNK">SNK</a>
</td>
<td style="text-align:center;">1998, 1999
</td>
<td style="text-align:right" data-sort-value="2">2&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-gamepro-handheld_98-0" class="reference"><a href="#cite_note-gamepro-handheld-98">[88]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Magnavox_Odyssey%C2%B2" class="mw-redirect" title="Magnavox Odyssey²">Magnavox Odyssey²</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Magnavox" title="Magnavox">Magnavox</a>/<a href="/wiki/Philips" title="Philips">Philips</a>
</td>
<td style="text-align:center;">1978
</td>
<td style="text-align:right">2&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-Magnavox_Odyssey2_99-0" class="reference"><a href="#cite_note-Magnavox_Odyssey2-99">[89]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Sega_SG-1000" class="mw-redirect" title="Sega SG-1000">Sega SG-1000</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Sega" title="Sega">Sega</a>
</td>
<td style="text-align:center;">1983
</td>
<td style="text-align:right" data-sort-value="1.99">2&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-Tanaka_100-0" class="reference"><a href="#cite_note-Tanaka-100">[90]</a></sup><sup id="cite_ref-Co-opetition_101-0" class="reference"><a href="#cite_note-Co-opetition-101">[91]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Oculus_Go" title="Oculus Go">Oculus Go</a>
</td>
<td><a href="/wiki/Virtual_reality_headset" title="Virtual reality headset">VR headset</a>
</td>
<td><a href="/wiki/Reality_Labs" title="Reality Labs">Oculus</a>
</td>
<td style="text-align:center;">2018
</td>
<td style="text-align:right;">2 million <small>(estimate)</small>
</td>
<td style="text-align:center;"><sup id="cite_ref-102" class="reference"><a href="#cite_note-102">[92]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/PC_Engine_CD-ROM%C2%B2" class="mw-redirect" title="PC Engine CD-ROM²">PC Engine CD-ROM²</a>
</td>
<td>Home console add-on
</td>
<td><a href="/wiki/NEC" title="NEC">NEC</a>
</td>
<td style="text-align:center;">1988
</td>
<td style="text-align:right">1.92&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-103" class="reference"><a href="#cite_note-103">[93]</a></sup><sup id="cite_ref-104" class="reference"><a href="#cite_note-104">[94]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Atari_7800" title="Atari 7800">Atari 7800</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Atari" title="Atari">Atari</a>
</td>
<td style="text-align:center;">1986
</td>
<td style="text-align:right" data-sort-value="1.01"><sup class="reference plainlinks nourlexpansion" id="ref_Greater"><a href="#endnote_Greater">&gt;</a></sup>1&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-Atari_7800_106-0" class="reference"><a href="#cite_note-Atari_7800-106">[note 11]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Atari_Lynx" title="Atari Lynx">Atari Lynx</a>
</td>
<td>Handheld
</td>
<td><a href="/wiki/Atari" title="Atari">Atari</a>
</td>
<td style="text-align:center;">1989
</td>
<td style="text-align:right" data-sort-value="1.01"><sup class="reference plainlinks nourlexpansion" id="ref_Greater"><a href="#endnote_Greater">&gt;</a></sup>1&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-atarilynx_109-0" class="reference"><a href="#cite_note-atarilynx-109">[note 12]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Philips_CD-i" class="mw-redirect" title="Philips CD-i">Philips CD-i</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Philips" title="Philips">Philips</a>
</td>
<td style="text-align:center;">1990
</td>
<td style="text-align:right" data-sort-value="1.01"><sup class="reference plainlinks nourlexpansion" id="ref_Greater"><a href="#endnote_Greater">&gt;</a></sup>1&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-Philips_112-0" class="reference"><a href="#cite_note-Philips-112">[note 13]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Telstar_(game_console)" class="mw-redirect" title="Telstar (game console)">Telstar</a>
</td>
<td>Dedicated
</td>
<td><a href="/wiki/Coleco" title="Coleco">Coleco</a>
</td>
<td style="text-align:center;">1976
</td>
<td style="text-align:right" data-sort-value="1.01"><sup class="reference plainlinks nourlexpansion" id="ref_Greater"><a href="#endnote_Greater">&gt;</a></sup>1&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-dedicated_golden_113-0" class="reference"><a href="#cite_note-dedicated_golden-113">[100]</a></sup><sup id="cite_ref-telstar_115-0" class="reference"><a href="#cite_note-telstar-115">[note 14]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Atari_5200" title="Atari 5200">Atari 5200</a>
</td>
<td>Home
</td>
<td><a href="/wiki/Atari" title="Atari">Atari</a>
</td>
<td style="text-align:center;">1982
</td>
<td style="text-align:right">1&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-a5200_116-0" class="reference"><a href="#cite_note-a5200-116">[102]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Pegasus_(console)" title="Pegasus (console)">Pegasus</a> (<a href="/wiki/Famiclone" title="Famiclone">famiclone</a>)
</td>
<td>Home
</td>
<td><a href="/wiki/Micro_Genius" title="Micro Genius">Micro Genius</a>
</td>
<td style="text-align:center;">1991
</td>
<td style="text-align:right">1&nbsp;million
</td>
<td style="text-align:center;"><sup id="cite_ref-117" class="reference"><a href="#cite_note-117">[103]</a></sup>
</td></tr>
<tr>
<td><a href="/wiki/Oculus_Quest" title="Oculus Quest">Oculus Quest</a>
</td>
<td><a href="/wiki/Virtual_reality_headset" title="Virtual reality headset">VR headset</a>
</td>
<td><a href="/wiki/Reality_Labs" title="Reality Labs">Oculus</a>
</td>
<td style="text-align:center;">2019
</td>
<td style="text-align:right" data-sort-value="0.6585">317,000–1&nbsp;million <small>(estimate)</small>
</td>
<td style="text-align:center;"><sup id="cite_ref-118" class="reference"><a href="#cite_note-118">[104]</a></sup><sup id="cite_ref-119" class="reference"><a href="#cite_note-119">[105]</a></sup>
</td></tr></tbody><tfoot></tfoot></table>`;

export default function Home() {
  const [table, setTable] = useState(defaultA);
  const [json, setJson] = useState<any[]>();
  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(JSON.stringify(json, null, 2));
    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const onSubmit = () => {
    const $ = cheerio.load(table);
    if ($("table").html()) {
      const headersText = $("table tr th")
        .text()
        .split("\n")
        .map((value) =>
          value
            .replace(/\[.*?\]/g, "")
            .toLocaleLowerCase()
            .split(" ")
            .join("_")
        );

      let bodyElements: string[][] = [];
      $("table tbody")
        .find("tr")
        .each((_, element) => {
          bodyElements = [
            ...bodyElements,
            element.children
              .filter((a) => a.type === "tag")
              .map((a) => $(a).text().split("\n").join("")),
          ];
        });

      setJson(
        bodyElements.reduce((acc, curr) => {
          let thisOne: { [a: string]: string } = {};
          headersText.map((header, i) => {
            if (header && curr[i]) thisOne[header] = curr[i];
          });

          acc.push(thisOne);
          return acc;
        }, [])
      );
      setSelected(headersText.filter((e) => e));
    } else {
      console.log("oh no");
    }
  };

  useEffect(() => {
    if (json) {
      console.log(selected, Object.keys(json[0]));
    }
  }, [selected]);
  return (
    <main className="grid grid-cols-2 gap-8 sm:p-24 p-8 min-h-screen container">
      <div className="relative">
        <Button onClick={onSubmit} className="absolute top-0 right-0">
          Give me that json
        </Button>
        <Textarea
          className="h-full"
          placeholder="Type your message here."
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />
      </div>
      {json ? (
        <section>
          <div className="flex gap-2 flex-wrap mb-4">
            {Object.keys(json[0]).map((header) => (
              <div className="items-top flex space-x-2">
                <Checkbox
                  id={header}
                  checked={selected.includes(header)}
                  onCheckedChange={(checked) =>
                    !checked
                      ? setSelected((sel) => sel.filter((s) => s !== header))
                      : setSelected((sel) => [...sel, header])
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={header}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                  >
                    {header}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <Button
              onClick={onCopy}
              size={"sm"}
              variant={"ghost"}
              className="absolute top-0 right-0"
            >
              {copied ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                  <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
                  <path d="M11 14l2 2l4 -4" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                  <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
                </svg>
              )}
            </Button>
            <Code code={JSON.stringify(json, null, 2)}></Code>
          </div>
        </section>
      ) : null}
    </main>
  );
}
