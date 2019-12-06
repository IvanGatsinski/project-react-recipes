import React from 'react';
import ErrorProvider from './Error';
import AuthProvider from './Auth';
import UserProvider from './User';
import RecipeProvider from './Recipe';
import CommentProvider from './Comment';
import { Waiter as WaitProvider } from 'react-wait';

export default function ({ children }) {
    return (
        <ErrorProvider>
            <AuthProvider>
                <UserProvider>
                    <RecipeProvider>
                        <CommentProvider>
                            <WaitProvider>
                                {children}
                            </WaitProvider>
                        </CommentProvider>
                    </RecipeProvider>
                </UserProvider>
            </AuthProvider>
        </ErrorProvider>
    )
}