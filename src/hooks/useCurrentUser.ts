"use client";
import { UserProfile } from '@/types/spotify';
import { useEffect, useState } from 'react';

export const useCurrentUser = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/me', {
                    credentials: 'include'
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setError('인증이 필요합니다.');
                        return;
                    }
                    throw new Error(`사용자 정보를 가져올 수 없습니다: ${response.status}`);
                }

                const userData = await response.json();
                setUser(userData);

            } catch (err) {
                console.error('사용자 정보 가져오기 오류:', err);
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};
