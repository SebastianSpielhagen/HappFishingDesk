import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Member {
    id: string;
    // weitere Member Felder
}

const MemberList: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('/api/members');
                setMembers(response.data);
            } catch (error) {
                // Handle the error
            }
        };

        fetchMembers();
    }, []);

    return (
        <div>
            {members.map((member) => (
                <div key={member.id}>{/* Anzeigen der Member-Daten */}</div>
            ))}
        </div>
    );
};

export default MemberList;