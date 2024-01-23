<?php

declare(strict_types=1);

namespace App\Enums;

enum PointType
{
    // Media
    const MEDIA_APPROVED = 'media_approved';

    const MEDIA_DOWNLOADED = 'media_downloaded';

    const MEDIA_SEEN = 'media_seen';

    const USER_LIKED_MEDIA = 'user_liked_media';

    // User
    const USER_FOLLOWING = 'user_following';

    const STAFF_USER_FOLLOWING = 'staff_user_following';

    // MISC
    const DAILY_LOGIN = 'daily_login';

    const REGISTERED = 'registered';
}
