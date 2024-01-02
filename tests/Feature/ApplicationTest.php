<?php

arch('debugging statements not used')
    ->expect(['dd', 'dump', 'var_dump'])
    ->not->toBeUsed();

arch('env functions only usef in config')
    ->expect(['env'])
    ->not->toBeUsed();

arch('strict type is declared')
    ->expect('App')
    ->toUseStrictTypes();
