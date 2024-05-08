using {sap.user as my} from '../db/schema-user';

service UserService {
    entity User as
        projection on my.User {
            document,
            name,
            last_name
        };

    action createUser(document : String, name : String, last_name : String)
}
