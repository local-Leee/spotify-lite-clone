"use client";
import { useEffect, useState } from "react";

export default function SearchPage() {
    const [me, setMe] = useState<any>(null);

    useEffect(() => {
        fetch("/api/me")
        .then(r => r.json())
        .then((d) => setMe(d));
    }, []);

    if (!me) return <p className="p-4">/api/me 결과 대기…</p>;
    if ((me as any).error) return <pre className="p-4 text-red-400">{JSON.stringify(me, null, 2)}</pre>;

    return <pre className="p-4">{JSON.stringify(me, null, 2)}</pre>;
}
