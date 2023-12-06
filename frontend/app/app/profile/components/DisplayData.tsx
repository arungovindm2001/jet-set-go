
import { UserData } from "@/types/types"

interface DisplayDataProps {
    userData: UserData;
}

export const DisplayData: React.FC<DisplayDataProps> = ({ userData }) => {
    const environmentPrefs = userData.environment_preferences
    console.log(environmentPrefs)

    return (
        <div className="grid grid-cols-2 w-full">
            <div className="grid h-20 place-items-center">Name</div>
            <div className="grid h-20 flex-grow card place-items-center">
                <input type="text" value={userData.name} disabled className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="grid h-20 place-items-center">Username</div>
            <div className="grid h-20 flex-grow card place-items-center">
                <input type="text" value={userData.username} disabled className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="grid h-20 place-items-center">Email</div>
            <div className="grid h-20 flex-grow card place-items-center">
                <input type="text" value={userData.email} disabled className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="grid h-20 place-items-center">Phone</div>
            <div className="grid h-20 flex-grow card place-items-center">
                <input type="text" value={userData.phone} disabled className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="grid h-20 place-items-center">Environment Preferences</div>
            <div className="grid h-40 flex-grow card place-items-center gap-4">
                <div className="form-control">
                    {Object.entries(environmentPrefs).map(([preference, checked]) => (
                        <label key={preference} className="label space-x-4">
                            <span className="label-text">{preference}</span>
                            {checked ? (
                                <input type="checkbox" className="checkbox" checked disabled />
                            ) : (
                                <input type="checkbox" className="checkbox" disabled/>

                            )}
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid h-20 place-items-center">City</div>
            <div className="grid h-20 flex-grow card place-items-center">
                <input type="text" value={userData.city} disabled className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="grid h-20 place-items-center">State</div>
            <div className="grid h-20 flex-grow card place-items-center">
                <input type="text" value={userData.state} disabled className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="grid h-20 place-items-center">Country</div>
            <div className="grid h-20 flex-grow card place-items-center">
                <input type="text" value={userData.country} disabled className="input input-bordered w-full max-w-xs" />
            </div>
        </div>
        // <div className="grid grid-cols-2 gap-4">
        //     <div>
        //         <h2>Hotel Ratings</h2>
        //         <ul>
        //             {Object.entries(userData.hotel_ratings).map(([hotelName, rating]) => (
        //                 <li key={hotelName}>
        //                     <p>Hotel Name: {hotelName}</p>
        //                     <p>Rating: {rating}</p>
        //                 </li>
        //             ))}
        //         </ul>
        //     </div>
        // </div>
    );
}