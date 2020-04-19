import React from 'react';

import Avatar from '~/components/Avatar';
import AvatarPlaceholder from '~/components/AvatarPlaceholder';

export function renderAvatar(avatar, name = null) {
  return (
    <>
      {avatar ? (
        <Avatar url={avatar.url} />
      ) : (
        <AvatarPlaceholder>{name}</AvatarPlaceholder>
      )}
    </>
  );
}
