import { useQuery } from '@tanstack/react-query'
import { meService } from '../../services/auth.service'

export function useCitizenMeQuery() {
    return useQuery({
        queryKey: ['citizen-me'],
        queryFn: () => meService(),
        refetchInterval: 30000,
    })
}
