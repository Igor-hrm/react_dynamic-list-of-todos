import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const isDone: boolean = todo.completed;
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const classComplete = classNames({
    'has-text-success': isDone,
    'has-text-danger': !isDone,
  });

  useEffect(() => {
    setIsLoading(true);

    getUser(todo.userId)
      .then(userData => {
        setUser(userData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classComplete}>
                {isDone ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email ?? '#'}`}>
                {user?.name ?? 'Unknown'}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
