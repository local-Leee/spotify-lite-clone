import { Button } from '../../ui/Button/Button';
import { ProfileProps } from './Profile.type';


const Profile = ({ id, className, display_name  }: ProfileProps) => {
    return (
        <div id={id} className={className}>
            <Button variant="scale">
                0/5
            </Button>
            <Button shape="circle" variant="scale">
                {display_name}
            </Button>
        </div>
    );
};

Profile.displayName = 'Profile';
export { Profile };

