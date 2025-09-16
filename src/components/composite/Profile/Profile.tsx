import { IconFriendActivity, IconWhatNewFeed } from '@/components/icons';
import { Button } from '../../ui/Button/Button';
import { ProfileProps } from './Profile.types';


const Profile = ({ id, className, display_name  }: ProfileProps) => {
    return (
        <div id={id} className={className}>
            <Button size="small" bgColor="transparent" variant="scale" className="ml-4" title="새소식">
                <IconWhatNewFeed />
            </Button>
            <Button size="small" bgColor="transparent" variant="scale" className="ml-2" title="친구 피드">
                <IconFriendActivity />
            </Button>
        </div>
        
    );
};

Profile.displayName = 'Profile';
export { Profile };

